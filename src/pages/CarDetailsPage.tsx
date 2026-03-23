import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PageContainer } from "../components/layout/PageContainer";
import { ResponsiveImage } from "../components/common/ResponsiveImage";
import { StoryCard } from "../components/cards/StoryCard";
import { futureCars, popularCars } from "../data/siteData";
import type { Article } from "../types";

type CarSectionTab = {
  id: string;
  label: string;
};

const carSectionTabs: CarSectionTab[] = [
  { id: "at-a-glance", label: "At a Glance" },
  { id: "overview", label: "Overview" },
  { id: "rank", label: "Rank" },
  { id: "pricing", label: "Pricing" },
  { id: "engine-performance", label: "Engine & Performance" },
  { id: "zero-sixty", label: "0-60 Time" },
  { id: "fuel-economy", label: "Fuel Economy" },
  { id: "interior", label: "Interior" },
  { id: "infotainment", label: "Infotainment" },
  { id: "safety", label: "Safety" },
  { id: "warranty", label: "Warranty" },
  { id: "specifications", label: "Specifications" },
  { id: "similar-vehicles", label: "Similar Vehicles" },
];
const DEFAULT_EDITOR_TRIM_NAME = "Premium Luxury";
const PENDING_SCROLL_LOCK_MS = 1800;

function findCarById(carId?: string): Article | undefined {
  if (!carId) {
    return undefined;
  }

  const allCars = [...popularCars, ...futureCars];
  return allCars.find((car) => car.id === carId);
}

function formatRatingOutOfTen(rating?: number): string {
  const safeRating = typeof rating === "number" && Number.isFinite(rating) ? Math.min(5, Math.max(0, rating)) : 4.5;
  const outOfTen = safeRating * 2;
  const text = Number.isInteger(outOfTen) ? `${outOfTen.toFixed(0)}` : outOfTen.toFixed(1);
  return `${text}/10`;
}

function formatLacsAmount(priceLacs: number): string {
  const safePrice = Number.isFinite(priceLacs) ? Math.max(0, priceLacs) : 0;
  const minimumFractionDigits = Number.isInteger(safePrice) ? 0 : 1;
  return safePrice.toLocaleString("en-PK", { minimumFractionDigits, maximumFractionDigits: 2 });
}

function extractBrand(title: string): string {
  const tokens = title.trim().split(/\s+/);
  if (!tokens.length) {
    return "Carlogue";
  }

  if (/^\d{4}$/.test(tokens[0]) && tokens[1]) {
    return tokens[1];
  }

  return tokens[0];
}

function normalizeLookupValue(value: string): string {
  return value.trim().toLowerCase().replace(/[\s_-]+/g, " ");
}

function getCarBrand(article: Article): string {
  const explicitBrand = (article as Article & { brand?: string }).brand;
  if (explicitBrand && explicitBrand.trim().length) {
    return explicitBrand.trim();
  }

  return extractBrand(article.title);
}

function getCarCategory(article: Article): string {
  if (article.category && article.category.trim().length) {
    return article.category.trim();
  }

  const title = article.title.toLowerCase();
  if (title.includes("pickup") || title.includes("trx")) {
    return "Pickup";
  }
  if (title.includes("suv")) {
    return "SUVs";
  }
  if (title.includes("crossover")) {
    return "Crossovers";
  }
  if (title.includes("hatch")) {
    return "Hatchbacks";
  }
  if (title.includes("sedan")) {
    return "Sedans";
  }
  if (title.includes("ev") || title.includes("electric")) {
    return "EVs";
  }
  if (title.includes("performance")) {
    return "Performance";
  }

  return "";
}

function buildCarGallery(car: Article): string[] {
  const galleryCandidates = [...(car.gallery ?? []), car.image].filter((source): source is string => Boolean(source && source.trim().length));
  if (!galleryCandidates.length) {
    return [];
  }

  const uniqueGallery = Array.from(new Set(galleryCandidates));
  while (uniqueGallery.length < 4) {
    uniqueGallery.push(uniqueGallery[uniqueGallery.length - 1]);
  }

  return uniqueGallery;
}

function getMainNavHeight(): number {
  const nav = document.querySelector(".main-nav-shell");
  if (!nav) {
    return 0;
  }

  return Math.ceil(nav.getBoundingClientRect().height);
}

export function CarDetailsPage() {
  const { carId } = useParams();
  const car = findCarById(carId);
  const allCars = [...popularCars, ...futureCars];
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState<string>(carSectionTabs[0]?.id ?? "at-a-glance");
  const [navStickyOffset, setNavStickyOffset] = useState(0);
  const [isTabsStuck, setIsTabsStuck] = useState(false);
  const [canScrollTabsLeft, setCanScrollTabsLeft] = useState(false);
  const [canScrollTabsRight, setCanScrollTabsRight] = useState(false);
  const [selectedSpecTrimName, setSelectedSpecTrimName] = useState(DEFAULT_EDITOR_TRIM_NAME);
  const [isSpecVariantMenuOpen, setIsSpecVariantMenuOpen] = useState(false);
  const tabsNavRef = useRef<HTMLDivElement | null>(null);
  const tabsRowRef = useRef<HTMLDivElement | null>(null);
  const specVariantMenuRef = useRef<HTMLDivElement | null>(null);
  const pendingScrollSectionIdRef = useRef<string | null>(null);
  const pendingScrollStartedAtRef = useRef<number | null>(null);

  function getSectionActivationAnchor(sectionId: string): HTMLElement | null {
    const section = document.getElementById(sectionId);
    if (!section) {
      return null;
    }

    if (sectionId === "at-a-glance") {
      return section;
    }

    return section.querySelector<HTMLElement>(".car-template-section-title") ?? section;
  }

  if (!car) {
    return (
      <section className="section car-template-page">
        <PageContainer>
          <div className="car-template-shell">
            <article className="car-template-block">
              <h1 className="car-template-title">Car Not Found</h1>
              <p className="car-template-text centered">The selected car does not exist in the current catalog.</p>
              <div className="car-template-actions">
                <Link to="/shop-new-cars" className="outline-button">
                  Back to Shop New Cars
                </Link>
              </div>
            </article>
          </div>
        </PageContainer>
      </section>
    );
  }

  const basePrice = typeof car.startingPriceLacs === "number" && Number.isFinite(car.startingPriceLacs) ? Math.max(0, car.startingPriceLacs) : 100;
  const highPrice = basePrice + 34;
  const brand = getCarBrand(car);
  const normalizedBrand = normalizeLookupValue(brand);
  const normalizedCategory = normalizeLookupValue(getCarCategory(car));
  const gallery = useMemo(() => buildCarGallery(car), [car]);
  const activeImage = gallery[activeGalleryIndex] ?? gallery[0] ?? car.image;
  const exteriorImageTwo = gallery[1] ?? gallery[0] ?? car.image;
  const exteriorImageThree = gallery[2] ?? gallery[0] ?? car.image;
  const interiorImageFour = gallery[3] ?? gallery[0] ?? car.image;

  useEffect(() => {
    setActiveGalleryIndex(0);
  }, [car.id]);

  useEffect(() => {
    setIsSpecVariantMenuOpen(false);
  }, [car.id]);

  useEffect(() => {
    if (!isSpecVariantMenuOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (!(event.target instanceof Node)) {
        return;
      }

      const menuElement = specVariantMenuRef.current;
      if (menuElement && !menuElement.contains(event.target)) {
        setIsSpecVariantMenuOpen(false);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSpecVariantMenuOpen(false);
      }
    }

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("touchstart", handlePointerDown, { passive: true });
    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isSpecVariantMenuOpen]);

  useEffect(() => {
    function updateMainNavHeight() {
      setNavStickyOffset(getMainNavHeight());
    }

    updateMainNavHeight();

    const nav = document.querySelector(".main-nav-shell");
    const resizeObserver = nav ? new ResizeObserver(updateMainNavHeight) : null;
    if (resizeObserver && nav) {
      resizeObserver.observe(nav);
    }

    window.addEventListener("resize", updateMainNavHeight);

    return () => {
      window.removeEventListener("resize", updateMainNavHeight);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const tabs = carSectionTabs;
    if (!tabs.length) {
      return;
    }

    function updateActiveSectionAndStickyState() {
      const tabsNavElement = tabsNavRef.current;
      if (!tabsNavElement) {
        return;
      }

      const tabsTop = tabsNavElement.getBoundingClientRect().top;
      const stickyNow = tabsTop <= navStickyOffset + 1 && window.scrollY > 0;
      setIsTabsStuck(stickyNow);

      const activationLine = Math.ceil(tabsNavElement.getBoundingClientRect().bottom) + 2;
      const pendingSectionId = pendingScrollSectionIdRef.current;
      if (pendingSectionId) {
        const pendingAnchor = getSectionActivationAnchor(pendingSectionId);
        const pendingAge = pendingScrollStartedAtRef.current ? Date.now() - pendingScrollStartedAtRef.current : 0;
        if (pendingAnchor) {
          const pendingDistance = Math.abs(pendingAnchor.getBoundingClientRect().top - activationLine);
          if (pendingDistance > 10 && pendingAge < PENDING_SCROLL_LOCK_MS) {
            setActiveSectionId(pendingSectionId);
            return;
          }
        }
        pendingScrollSectionIdRef.current = null;
        pendingScrollStartedAtRef.current = null;
      }

      let currentId = tabs[0].id;

      for (const tab of tabs) {
        const anchor = getSectionActivationAnchor(tab.id);
        if (!anchor) {
          continue;
        }

        const top = anchor.getBoundingClientRect().top;
        if (top <= activationLine) {
          currentId = tab.id;
          continue;
        }

        break;
      }

      const nearBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (nearBottom && tabs.length) {
        currentId = tabs[tabs.length - 1].id;
      }

      setActiveSectionId(currentId);
    }

    updateActiveSectionAndStickyState();
    window.addEventListener("scroll", updateActiveSectionAndStickyState, { passive: true });
    window.addEventListener("resize", updateActiveSectionAndStickyState);

    return () => {
      window.removeEventListener("scroll", updateActiveSectionAndStickyState);
      window.removeEventListener("resize", updateActiveSectionAndStickyState);
    };
  }, [navStickyOffset, car.id]);

  useEffect(() => {
    const tabsElement = tabsRowRef.current;
    if (!tabsElement) {
      return;
    }

    const activeTab = tabsElement.querySelector<HTMLButtonElement>(".car-template-tab.is-active");
    if (!activeTab) {
      return;
    }

    const viewportLeft = tabsElement.scrollLeft;
    const viewportRight = viewportLeft + tabsElement.clientWidth;
    const targetLeft = activeTab.offsetLeft;
    const targetRight = targetLeft + activeTab.offsetWidth;
    const edgePadding = 28;

    if (targetLeft < viewportLeft + edgePadding || targetRight > viewportRight - edgePadding) {
      const centeredLeft = targetLeft - (tabsElement.clientWidth - activeTab.offsetWidth) / 2;
      tabsElement.scrollTo({
        left: Math.max(0, centeredLeft),
        behavior: "smooth",
      });
    }
  }, [activeSectionId, car.id]);

  useEffect(() => {
    const tabsElement = tabsRowRef.current;
    if (!tabsElement) {
      return;
    }

    function updateTabScrollState() {
      const element = tabsRowRef.current;
      if (!element) {
        return;
      }

      const maxScrollLeft = element.scrollWidth - element.clientWidth;
      setCanScrollTabsLeft(element.scrollLeft > 2);
      setCanScrollTabsRight(element.scrollLeft < maxScrollLeft - 2);
    }

    updateTabScrollState();
    tabsElement.addEventListener("scroll", updateTabScrollState, { passive: true });
    window.addEventListener("resize", updateTabScrollState);

    return () => {
      tabsElement.removeEventListener("scroll", updateTabScrollState);
      window.removeEventListener("resize", updateTabScrollState);
    };
  }, [car.id]);

  function scrollToSection(sectionId: string) {
    const anchor = getSectionActivationAnchor(sectionId);
    if (!anchor) {
      return;
    }

    const currentMainNavHeight = getMainNavHeight();
    if (currentMainNavHeight !== navStickyOffset) {
      setNavStickyOffset(currentMainNavHeight);
    }

    const tabsNavElement = tabsNavRef.current;
    const stickyHeadingOffset = currentMainNavHeight + (tabsNavElement?.offsetHeight ?? 0) + 8;
    anchor.style.scrollMarginTop = `${stickyHeadingOffset}px`;
    pendingScrollSectionIdRef.current = sectionId;
    pendingScrollStartedAtRef.current = Date.now();
    setActiveSectionId(sectionId);
    anchor.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function scrollTabs(direction: "left" | "right") {
    const tabsElement = tabsRowRef.current;
    if (!tabsElement) {
      return;
    }

    const amount = Math.round(tabsElement.clientWidth * 0.45);
    const delta = direction === "left" ? -amount : amount;
    tabsElement.scrollBy({ left: delta, behavior: "smooth" });
  }

  function goToPreviousImage() {
    if (!gallery.length) {
      return;
    }

    setActiveGalleryIndex((current) => (current - 1 + gallery.length) % gallery.length);
  }

  function goToNextImage() {
    if (!gallery.length) {
      return;
    }

    setActiveGalleryIndex((current) => (current + 1) % gallery.length);
  }
  const similarVehicles = allCars
    .filter((candidate) => candidate.id !== car.id)
    .filter((candidate) => normalizeLookupValue(getCarCategory(candidate)) === normalizedCategory)
    .slice(0, 3);
  const moreFromBrand = allCars
    .filter((candidate) => candidate.id !== car.id)
    .filter((candidate) => normalizeLookupValue(getCarBrand(candidate)) === normalizedBrand)
    .slice(0, 3);
  const rankedVehiclesWithPosition = [...allCars]
    .sort((left, right) => (right.rating ?? 0) - (left.rating ?? 0))
    .map((vehicle, index) => ({ vehicle, rank: index + 1 }));

  const rankedVehicles = rankedVehiclesWithPosition.slice(0, 6);
  if (!rankedVehicles.some((entry) => entry.vehicle.id === car.id)) {
    const currentVehicleRanking = rankedVehiclesWithPosition.find((entry) => entry.vehicle.id === car.id);
    if (currentVehicleRanking && rankedVehicles.length) {
      rankedVehicles[rankedVehicles.length - 1] = currentVehicleRanking;
    }
  }

  const trimRows = [
    {
      name: "Luxury",
      price: basePrice,
      highlights: ["18-inch alloy wheels", "Dual-zone climate control", "Wireless Apple CarPlay and Android Auto"],
    },
    {
      name: "Premium Luxury",
      price: basePrice + 12,
      highlights: ["Panoramic sunroof", "Ventilated front seats", "Blind-spot monitoring with rear cross-traffic alert"],
    },
    {
      name: "Sport",
      price: highPrice,
      highlights: ["Adaptive dampers and sport-tuned suspension", "Larger front brakes with performance pads", "360-degree camera and advanced parking assist"],
    },
  ];
  const editorSelectedTrimName = trimRows.find((trim) => trim.name === DEFAULT_EDITOR_TRIM_NAME)?.name ?? trimRows[0]?.name ?? "";
  const usePricingCarousel = trimRows.length > 3;
  const fallbackTrim = trimRows[0] ?? { name: DEFAULT_EDITOR_TRIM_NAME, price: basePrice, highlights: [] as string[] };
  const selectedSpecTrim = trimRows.find((trim) => trim.name === selectedSpecTrimName) ?? fallbackTrim;
  const trimSpecProfiles: Record<
    string,
    {
      enginePower: string;
      engineTorque: string;
      transmission: string;
      curbWeight: string;
      acceleration: string;
      quarterMile: string;
      topSpeed: string;
      fuelEconomy: string;
      wheelAndTire: string;
      brakes: string;
      suspension: string;
    }
  > = {
    Luxury: {
      enginePower: "188 hp @ 5,800 rpm",
      engineTorque: "300 Nm @ 1,800 rpm",
      transmission: "8-speed automatic",
      curbWeight: "1,540 kg",
      acceleration: "0-100 km/h: 8.0 sec",
      quarterMile: "1/4-mile: 16.1 sec",
      topSpeed: "Top Speed: 230 km/h",
      fuelEconomy: "13.8 / 11.7 / 16.2 km/l",
      wheelAndTire: "17-in alloy wheels, 225/45 R17 tires",
      brakes: "Ventilated front discs / solid rear discs",
      suspension: "Front strut / rear multi-link",
    },
    "Premium Luxury": {
      enginePower: "194 hp @ 5,800 rpm",
      engineTorque: "320 Nm @ 1,700 rpm",
      transmission: "8-speed automatic with adaptive shift mapping",
      curbWeight: "1,575 kg",
      acceleration: "0-100 km/h: 7.6 sec",
      quarterMile: "1/4-mile: 15.8 sec",
      topSpeed: "Top Speed: 238 km/h",
      fuelEconomy: "13.3 / 11.2 / 15.6 km/l",
      wheelAndTire: "18-in alloy wheels, 235/40 R18 tires",
      brakes: "Ventilated front discs / ventilated rear discs",
      suspension: "Comfort-tuned adaptive damping",
    },
    Sport: {
      enginePower: "205 hp @ 6,000 rpm",
      engineTorque: "340 Nm @ 1,600 rpm",
      transmission: "8-speed automatic with paddle shifters",
      curbWeight: "1,610 kg",
      acceleration: "0-100 km/h: 6.9 sec",
      quarterMile: "1/4-mile: 15.2 sec",
      topSpeed: "Top Speed: 248 km/h",
      fuelEconomy: "12.7 / 10.5 / 15.0 km/l",
      wheelAndTire: "19-in performance wheels, 235/35 R19 tires",
      brakes: "Large ventilated front / rear discs with sport pads",
      suspension: "Sport adaptive suspension with firmer calibration",
    },
  };
  const selectedTrimProfile = trimSpecProfiles[selectedSpecTrim.name] ?? trimSpecProfiles[DEFAULT_EDITOR_TRIM_NAME];
  const specSheetLeftSections = [
    {
      title: "Vehicle",
      lines: [
        "Vehicle Type: front-engine, 5-passenger, 4-door sedan",
        "Layout: longitudinal engine with rear-wheel drive bias",
        "Drivetrain: RWD (AWD available on selected trims)",
      ],
    },
    {
      title: "Price",
      lines: trimRows.map((trim) => `${trim.name}: PKR ${formatLacsAmount(trim.price)} lacs`),
    },
    {
      title: "Engine",
      lines: [
        "Type: turbocharged and intercooled inline-4, direct injection",
        "Displacement: 2.0 L (1,998 cc)",
        `Power: ${selectedTrimProfile.enginePower}`,
        `Torque: ${selectedTrimProfile.engineTorque}`,
      ],
    },
    {
      title: "Transmission",
      lines: [
        `Gearbox: ${selectedTrimProfile.transmission}`,
        "Drive Modes: Eco, Comfort, Sport",
        "Traction Management: Electronic stability + launch traction control",
      ],
    },
    {
      title: "Performance (Est)",
      lines: [selectedTrimProfile.acceleration, selectedTrimProfile.quarterMile, selectedTrimProfile.topSpeed],
    },
  ];
  const specSheetRightSections = [
    {
      title: "Dimensions",
      lines: [
        "Wheelbase: 107.7 in",
        "Length: 185.8 in",
        "Width: 72.0 in",
        "Height: 56.1 in",
        "Passenger Volume: 94 cu ft",
        "Cargo Volume: 24 cu ft",
        `Curb Weight (est): ${selectedTrimProfile.curbWeight}`,
      ],
    },
    {
      title: "Fuel Economy (Est)",
      lines: [
        `Combined / City / Highway: ${selectedTrimProfile.fuelEconomy}`,
        "Fuel Tank: 47 L (12.4 gal)",
        "Recommended Fuel: Premium unleaded",
      ],
    },
    {
      title: "Chassis, Brakes & Tires",
      lines: [`Brakes: ${selectedTrimProfile.brakes}`, `Suspension: ${selectedTrimProfile.suspension}`, `Wheels/Tires: ${selectedTrimProfile.wheelAndTire}`],
    },
    {
      title: "Warranty & Service",
      lines: [
        "Basic Warranty: 4 years / 50,000 miles",
        "Powertrain Warranty: 6 years / 70,000 miles",
        "Roadside Assistance: 4 years / 50,000 miles",
        "Service Interval: every 10,000 km or 12 months",
      ],
    },
  ];

  return (
    <section className="section car-template-page">
      <PageContainer>
        <div className="car-template-shell">
          <nav className="car-template-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/shop-new-cars">Shop New Cars</Link>
            <span>/</span>
            <span>{car.title}</span>
          </nav>

          <article className="car-template-hero" id="at-a-glance">
            <header className="car-template-hero-top">
              <h1 className="car-template-title">{car.title}</h1>
              <div className="car-template-rating-wrap">
                <p className="car-template-rating">{formatRatingOutOfTen(car.rating)}</p>
                <p className="car-template-rating-sub">Editor's Rating</p>
              </div>
            </header>

            <div className="car-template-carousel">
              <button type="button" className="car-template-carousel-arrow" onClick={goToPreviousImage} aria-label="Previous image">
                ‹
              </button>
              <ResponsiveImage
                src={activeImage}
                alt={`${car.title} image ${activeGalleryIndex + 1}`}
                ratio="16 / 9"
                className="car-template-carousel-image"
                placeholderLabel={car.title}
              />
              <button type="button" className="car-template-carousel-arrow" onClick={goToNextImage} aria-label="Next image">
                ›
              </button>
            </div>
            {gallery.length > 1 ? (
              <div className="car-template-carousel-dots" aria-label="Image navigation">
                {gallery.map((image, index) => (
                  <button
                    key={`${image}-${index + 1}`}
                    type="button"
                    className={index === activeGalleryIndex ? "is-active" : ""}
                    onClick={() => setActiveGalleryIndex(index)}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            ) : null}

            <p className="car-template-msrp-label">MSRP</p>
            <p className="car-template-price-range">{`PKR ${basePrice.toLocaleString("en-PK")}-${highPrice.toLocaleString("en-PK")} lacs`}</p>

            <div className="car-template-summary-grid">
              <article className="car-template-summary-card">
                <h3>Highs</h3>
                <p>Strong value proposition, distinctive exterior, and confident daily drivability.</p>
              </article>
              <article className="car-template-summary-card">
                <h3>Lows</h3>
                <p>Rear seat space and material quality can feel behind some premium competitors.</p>
              </article>
              <article className="car-template-summary-card">
                <h3>Verdict</h3>
                <p>A sharp compact luxury option with a balanced package for buyer-focused decisions.</p>
              </article>
            </div>
          </article>

          <div ref={tabsNavRef} className={`car-template-tab-nav ${isTabsStuck ? "is-stuck" : ""}`.trim()} style={{ top: `${navStickyOffset}px` }}>
            <button
              type="button"
              className="car-template-tab-arrow"
              onClick={() => scrollTabs("left")}
              aria-label="Scroll sections left"
              disabled={!canScrollTabsLeft}
            >
              ‹
            </button>

            <nav ref={tabsRowRef} className="car-template-tab-row" aria-label="Car section tabs">
              {carSectionTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`car-template-tab ${activeSectionId === tab.id ? "is-active" : ""}`.trim()}
                  onClick={() => scrollToSection(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            <button
              type="button"
              className="car-template-tab-arrow"
              onClick={() => scrollTabs("right")}
              aria-label="Scroll sections right"
              disabled={!canScrollTabsRight}
            >
              ›
            </button>
          </div>

          <section className="car-template-block" id="overview">
            <h2 className="car-template-section-title">Overview</h2>
            <p className="car-template-text centered">
              {car.title} is presented here as a full front-end template section, ready for backend-driven content. This block is structured to mirror
              editorial-style vehicle pages while retaining your Carlogue typography and color system. When real content is connected, this area can host
              a short buying summary, market position notes, and links to deeper analysis for readers comparing multiple vehicles in the same segment.
              For now, the longer copy helps verify spacing, wrapping behavior, and section transition readability across screen sizes.
            </p>
          </section>

          <section className="car-template-block" id="rank">
            <h2 className="car-template-section-title">Where This Vehicle Ranks</h2>
            <div className="car-template-rank-grid car-card-grid">
              {rankedVehicles.map(({ vehicle, rank }) => (
                <StoryCard
                  key={vehicle.id}
                  article={vehicle}
                  mode="car"
                  titleClamp={2}
                  rankLabel={`#${rank}`}
                  highlight={vehicle.id === car.id}
                />
              ))}
            </div>
          </section>

          <section className="car-template-block" id="pricing">
            <h2 className="car-template-section-title">Pricing and Which One to Buy</h2>
            <div className={`car-template-pricing-cards ${usePricingCarousel ? "is-carousel" : ""}`.trim()} role="list">
              {trimRows.map((trim, index) => {
                const previousTrim = trimRows[index - 1];
                const inheritedText = index > 0 ? `Everything in ${previousTrim.name} and:` : null;
                const bulletPoints = trim.highlights.slice(0, 3);
                const isSelected = editorSelectedTrimName === trim.name;
                const formattedPriceLacs = formatLacsAmount(trim.price);

                return (
                  <article
                    key={trim.name}
                    className={`car-template-pricing-card ${isSelected ? "is-selected" : ""}`.trim()}
                  >
                    <header className="car-template-pricing-head">
                      <h3 className="car-template-pricing-title">{trim.name}</h3>
                    </header>
                    <p className={`car-template-pricing-inherits ${inheritedText ? "" : "is-empty"}`.trim()}>{inheritedText ?? "Everything in"}</p>
                    <ul>
                      {bulletPoints.map((point) => (
                        <li key={`${trim.name}-${point}`}>{point}</li>
                      ))}
                    </ul>
                    <p className="car-template-pricing-price" aria-label={`Price PKR ${formattedPriceLacs} lacs`}>
                      <span className="car-template-pricing-currency">PKR</span>
                      <span className="car-template-pricing-amount">{formattedPriceLacs}</span>
                      <span className="car-template-pricing-unit">lacs</span>
                    </p>
                  </article>
                );
              })}
            </div>
            <p className="car-template-text centered">
              This template section is prepared for backend-driven variant data, pricing updates, and recommendation logic. It is designed so editorial
              teams can flag a preferred trim while product teams surface live prices, incentive updates, and in-stock availability by city. The extended
              placeholder text here is intentional so you can validate layout rhythm under realistic paragraph lengths.
            </p>
          </section>

          <section className="car-template-block" id="engine-performance">
            <h2 className="car-template-section-title">Engine, Transmission, and Performance</h2>
            <ResponsiveImage src={exteriorImageTwo} alt={`${car.title} exterior view 2`} ratio="16 / 9" className="car-template-inline-image" placeholderLabel="Exterior" />
            <p className="car-template-text centered">
              Buyers can compare engine output, transmission options, and driving character here. This section is meant to combine official specs with
              road-test impressions, including throttle response in city traffic, highway passing confidence, and transmission behavior in stop-and-go
              conditions. It can also host notes about power delivery by drive mode and how performance changes with load or altitude.
            </p>
          </section>

          <section className="car-template-block" id="zero-sixty">
            <h2 className="car-template-section-title">0-60-MPH Times</h2>
            <p className="car-template-text centered">
              0-60 performance figures and quarter-mile benchmarks can be surfaced in this section with trim filters and testing notes. Final production
              content can include launch method, ambient temperature, test surface, and tire condition so acceleration numbers are transparent and
              repeatable. This longer copy also helps confirm that the tab logic and scroll tracking remain stable when sections have more body text.
            </p>
          </section>

          <section className="car-template-block" id="fuel-economy">
            <h2 className="car-template-section-title">Fuel Economy and Real-World MPG</h2>
            <ResponsiveImage
              src={exteriorImageThree}
              alt={`${car.title} exterior view 3`}
              ratio="16 / 9"
              className="car-template-inline-image"
              placeholderLabel="Exterior"
            />
            <p className="car-template-text centered">
              This area supports official economy figures and real-world testing results, split by drivetrain and trim. It can include city, highway,
              and mixed-cycle snapshots, plus reader-friendly ownership context like monthly fuel spend assumptions for common commute distances. You can
              also compare efficiency deltas between wheel sizes, driving modes, and traffic-heavy versus open-road routes.
            </p>
          </section>

          <section className="car-template-block" id="interior">
            <h2 className="car-template-section-title">Interior, Comfort, and Cargo</h2>
            <ResponsiveImage src={interiorImageFour} alt={`${car.title} interior view`} ratio="16 / 9" className="car-template-inline-image" placeholderLabel="Interior" />
            <p className="car-template-text centered">
              Cabin quality, passenger room, and cargo usability details are presented here in a structured review format. This section can describe seat
              support on long trips, second-row comfort for adults, small-item storage practicality, and cargo area loading ease with daily-use examples.
              Additional paragraphs can later cover material quality, build consistency, and visibility from the driver seat in dense traffic.
            </p>
          </section>

          <section className="car-template-block" id="infotainment">
            <h2 className="car-template-section-title">Infotainment and Connectivity</h2>
            <p className="car-template-text centered">
              Screen size, platform features, smartphone integration, and audio system details can be listed and compared in this module. Final content
              can include interface responsiveness, voice command reliability, navigation clarity, and wireless phone charging behavior during extended
              use. This placeholder is intentionally longer to help verify paragraph spacing and readability in content-dense sections.
            </p>
          </section>

          <section className="car-template-block" id="safety">
            <h2 className="car-template-section-title">Safety and Driver-Assistance Features</h2>
            <p className="car-template-text centered">
              Core active and passive safety equipment can be summarized here before detailed feature bullets by trim. This area can eventually include
              crash-test references, feature availability by variant, and real-world usability notes for lane assist, adaptive cruise, and parking aids.
              The expanded text helps stress-test visual balance when this section contains both prose and lists.
            </p>
            <ul className="car-template-list">
              <li>Standard automated emergency braking with pedestrian detection</li>
              <li>Lane-departure warning with lane-keep assist</li>
              <li>Adaptive cruise support on higher variants</li>
            </ul>
          </section>

          <section className="car-template-block" id="warranty">
            <h2 className="car-template-section-title">Warranty and Maintenance Coverage</h2>
            <p className="car-template-text centered">
              Coverage details and ownership terms can be introduced here, with plan-specific points listed below. In production, this section can also
              summarize exclusions, service network coverage, roadside support conditions, and expected routine maintenance intervals for first owners.
              This longer text gives you better test coverage for section spacing and sticky-tab behavior.
            </p>
            <ul className="car-template-list">
              <li>Limited warranty and powertrain coverage summary</li>
              <li>Service and maintenance terms by variant</li>
              <li>Ownership-cost and coverage notes for buyers</li>
            </ul>
          </section>

          <section className="car-template-block" id="specifications">
            <h2 className="car-template-section-title">Specifications</h2>
            <article className="car-template-specsheet">
              <div className="car-template-specsheet-model-row">
                <p className="car-template-specsheet-model">{car.title}</p>
                <div className="car-template-specsheet-variant" ref={specVariantMenuRef}>
                  <button
                    id="spec-variant-select"
                    type="button"
                    className="car-template-specsheet-variant-button"
                    aria-haspopup="listbox"
                    aria-expanded={isSpecVariantMenuOpen}
                    aria-controls="spec-variant-listbox"
                    onClick={() => setIsSpecVariantMenuOpen((isOpen) => !isOpen)}
                  >
                    <span className="car-template-specsheet-variant-value">{selectedSpecTrim.name}</span>
                    <span className={`car-template-specsheet-variant-arrow ${isSpecVariantMenuOpen ? "is-open" : ""}`.trim()} aria-hidden="true" />
                  </button>

                  {isSpecVariantMenuOpen ? (
                    <ul id="spec-variant-listbox" className="car-template-specsheet-variant-menu" role="listbox" aria-label="Choose Variant">
                      {trimRows.map((trim) => {
                        const isSelected = trim.name === selectedSpecTrim.name;

                        return (
                          <li key={trim.name}>
                            <button
                              type="button"
                              className={`car-template-specsheet-variant-option ${isSelected ? "is-selected" : ""}`.trim()}
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => {
                                setSelectedSpecTrimName(trim.name);
                                setIsSpecVariantMenuOpen(false);
                              }}
                            >
                              {trim.name}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </div>
              </div>
              <div className="car-template-specsheet-columns">
                <div className="car-template-specsheet-column">
                  {specSheetLeftSections.map((section) => (
                    <section key={section.title} className="car-template-specsheet-group">
                      <h3>{section.title}</h3>
                      <ul className="car-template-specsheet-list">
                        {section.lines.map((line) => (
                          <li key={`${section.title}-${line}`}>{line}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
                <div className="car-template-specsheet-column">
                  {specSheetRightSections.map((section) => (
                    <section key={section.title} className="car-template-specsheet-group">
                      <h3>{section.title}</h3>
                      <ul className="car-template-specsheet-list">
                        {section.lines.map((line) => (
                          <li key={`${section.title}-${line}`}>{line}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </div>
            </article>
          </section>

          <section className="car-template-block" id="similar-vehicles">
            <h2 className="car-template-section-title">Similar Vehicles</h2>
            {similarVehicles.length ? (
              <div className="car-template-rank-grid car-card-grid">
                {similarVehicles.map((vehicle) => (
                  <StoryCard key={vehicle.id} article={vehicle} mode="car" titleClamp={2} />
                ))}
              </div>
            ) : (
              <p className="car-template-text centered">No vehicles found in this category yet.</p>
            )}
          </section>

          <section className="car-template-block">
            <h2 className="car-template-section-title">{`More from ${brand}`}</h2>
            {moreFromBrand.length ? (
              <div className="car-template-rank-grid car-card-grid">
                {moreFromBrand.map((vehicle) => (
                  <StoryCard key={vehicle.id} article={vehicle} mode="car" titleClamp={2} />
                ))}
              </div>
            ) : (
              <p className="car-template-text centered">{`No additional ${brand} models are available yet.`}</p>
            )}
          </section>
        </div>
      </PageContainer>
    </section>
  );
}
