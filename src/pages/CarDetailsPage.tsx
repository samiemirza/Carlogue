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

function formatPriceInLacs(startingPriceLacs?: number): string {
  const safePrice = typeof startingPriceLacs === "number" && Number.isFinite(startingPriceLacs) ? Math.max(0, startingPriceLacs) : 100;
  return `PKR ${safePrice.toLocaleString("en-PK")} lacs`;
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
  const [selectedTrimName, setSelectedTrimName] = useState("Luxury");
  const tabsNavRef = useRef<HTMLDivElement | null>(null);
  const tabsRowRef = useRef<HTMLDivElement | null>(null);

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
  const brand = extractBrand(car.title);
  const gallery = useMemo(() => buildCarGallery(car), [car]);
  const activeImage = gallery[activeGalleryIndex] ?? gallery[0] ?? car.image;
  const exteriorImageTwo = gallery[1] ?? gallery[0] ?? car.image;
  const exteriorImageThree = gallery[2] ?? gallery[0] ?? car.image;
  const interiorImageFour = gallery[3] ?? gallery[0] ?? car.image;

  useEffect(() => {
    setActiveGalleryIndex(0);
  }, [car.id]);

  useEffect(() => {
    function getMainNavHeight(): number {
      const nav = document.querySelector(".main-nav-shell");
      if (!nav) {
        return 0;
      }

      return Math.ceil(nav.getBoundingClientRect().height);
    }

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
      const tabsElement = tabsRowRef.current;
      const tabsNavElement = tabsNavRef.current;
      if (!tabsElement || !tabsNavElement) {
        return;
      }

      const tabsHeight = tabsElement.offsetHeight;
      const tabsTop = tabsNavElement.getBoundingClientRect().top;
      const stickyNow = tabsTop <= navStickyOffset + 1 && window.scrollY > 0;
      setIsTabsStuck(stickyNow);

      const scanLine = window.scrollY + navStickyOffset + tabsHeight + 22;
      let currentId = tabs[0].id;

      for (const tab of tabs) {
        const target = document.getElementById(tab.id);
        if (!target) {
          continue;
        }

        const targetTop = target.getBoundingClientRect().top + window.scrollY;
        if (scanLine >= targetTop) {
          currentId = tab.id;
        }
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
    const target = document.getElementById(sectionId);
    if (!target) {
      return;
    }

    const tabsHeight = tabsNavRef.current?.offsetHeight ?? 0;
    const targetY = target.getBoundingClientRect().top + window.scrollY - navStickyOffset - tabsHeight - 12;
    window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
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
  const brandAlternatives = allCars.filter((candidate) => candidate.id !== car.id && extractBrand(candidate.title) === brand);
  const similarVehicles = allCars.filter((candidate) => candidate.id !== car.id).slice(0, 3);
  const moreFromBrand = (brandAlternatives.length ? brandAlternatives : allCars.filter((candidate) => candidate.id !== car.id)).slice(0, 3);
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

  const specRows = [
    { label: "Vehicle Type", value: "Front-engine, rear-wheel-drive, 5-passenger, 4-door sedan" },
    { label: "Engine", value: "Turbocharged and intercooled inline-4, direct fuel injection" },
    { label: "Transmission", value: "8-speed automatic" },
    { label: "Drivetrain", value: "RWD (AWD on selected trims)" },
    { label: "Fuel Economy", value: "Estimated 13-18 km/l (variant dependent)" },
    { label: "Warranty", value: "4 years / 50,000 miles (template placeholder)" },
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
              editorial-style vehicle pages while retaining your Carlogue typography and color system.
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
            <div className="car-template-pricing-cards" role="list">
              {trimRows.map((trim, index) => {
                const previousTrim = trimRows[index - 1];
                const inheritedText = index > 0 ? `Everything in ${previousTrim.name} and:` : null;
                const bulletPoints = trim.highlights.slice(0, 3);
                const isSelected = selectedTrimName === trim.name;

                return (
                  <article
                    key={trim.name}
                    className={`car-template-pricing-card ${isSelected ? "is-selected" : ""}`.trim()}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedTrimName(trim.name)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedTrimName(trim.name);
                      }
                    }}
                    aria-pressed={isSelected}
                  >
                    <header className="car-template-pricing-head">
                      <h3>{trim.name}</h3>
                      <p>{`PKR ${trim.price.toLocaleString("en-PK")} lacs`}</p>
                    </header>
                    <p className={`car-template-pricing-inherits ${inheritedText ? "" : "is-empty"}`.trim()}>{inheritedText ?? "Everything in"}</p>
                    <ul>
                      {bulletPoints.map((point) => (
                        <li key={`${trim.name}-${point}`}>{point}</li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
            <p className="car-template-text centered">
              This template section is prepared for backend-driven variant data, pricing updates, and recommendation logic.
            </p>
          </section>

          <section className="car-template-block car-template-image-block">
            <ResponsiveImage src={exteriorImageTwo} alt={`${car.title} exterior view 2`} ratio="16 / 9" className="car-template-inline-image" placeholderLabel="Exterior" />
          </section>

          <section className="car-template-block" id="engine-performance">
            <h2 className="car-template-section-title">Engine, Transmission, and Performance</h2>
            <p className="car-template-text centered">
              Buyers can compare engine output, transmission options, and driving character here. Placeholder copy is intentionally concise and will be
              replaced with model-specific data and road-test notes.
            </p>
          </section>

          <section className="car-template-block" id="zero-sixty">
            <h2 className="car-template-section-title">0-60-MPH Times</h2>
            <p className="car-template-text centered">
              0-60 performance figures and quarter-mile benchmarks can be surfaced in this section with trim filters and testing notes.
            </p>
          </section>

          <section className="car-template-block" id="fuel-economy">
            <h2 className="car-template-section-title">Fuel Economy and Real-World MPG</h2>
            <p className="car-template-text centered">
              This area supports official economy figures and real-world testing results, split by drivetrain and trim.
            </p>
          </section>

          <section className="car-template-block car-template-image-block">
            <ResponsiveImage
              src={exteriorImageThree}
              alt={`${car.title} exterior view 3`}
              ratio="16 / 9"
              className="car-template-inline-image"
              placeholderLabel="Exterior"
            />
          </section>

          <section className="car-template-block" id="interior">
            <h2 className="car-template-section-title">Interior, Comfort, and Cargo</h2>
            <p className="car-template-text centered">
              Cabin quality, passenger room, and cargo usability details are presented here in a structured review format.
            </p>
            <ResponsiveImage src={interiorImageFour} alt={`${car.title} interior view`} ratio="16 / 9" className="car-template-inline-image" placeholderLabel="Interior" />
          </section>

          <section className="car-template-block" id="infotainment">
            <h2 className="car-template-section-title">Infotainment and Connectivity</h2>
            <p className="car-template-text centered">
              Screen size, platform features, smartphone integration, and audio system details can be listed and compared in this module.
            </p>
          </section>

          <section className="car-template-block" id="safety">
            <h2 className="car-template-section-title">Safety and Driver-Assistance Features</h2>
            <ul className="car-template-list">
              <li>Standard automated emergency braking with pedestrian detection</li>
              <li>Lane-departure warning with lane-keep assist</li>
              <li>Adaptive cruise support on higher variants</li>
            </ul>
          </section>

          <section className="car-template-block" id="warranty">
            <h2 className="car-template-section-title">Warranty and Maintenance Coverage</h2>
            <ul className="car-template-list">
              <li>Limited warranty and powertrain coverage summary</li>
              <li>Service and maintenance terms by variant</li>
              <li>Ownership-cost and coverage notes for buyers</li>
            </ul>
          </section>

          <section className="car-template-block" id="specifications">
            <h2 className="car-template-section-title">Specifications</h2>
            <div className="car-template-specs-grid">
              {specRows.map((spec) => (
                <article key={spec.label} className="car-template-spec-item">
                  <p>{spec.label}</p>
                  <h3>{spec.value}</h3>
                </article>
              ))}
            </div>
            <div className="car-template-actions">
              <button type="button" className="outline-button">
                More Features and Specs
              </button>
            </div>
          </section>

          <section className="car-template-block" id="similar-vehicles">
            <h2 className="car-template-section-title">Similar Vehicles</h2>
            <div className="car-template-vehicle-row">
              {similarVehicles.map((vehicle) => (
                <article key={vehicle.id} className="car-template-vehicle-card">
                  <ResponsiveImage src={vehicle.image} alt={vehicle.title} ratio="16 / 10" placeholderLabel={vehicle.title} />
                  <h3>{vehicle.title}</h3>
                  <p className="car-template-vehicle-rating">{formatRatingOutOfTen(vehicle.rating)}</p>
                  <p>{formatPriceInLacs(vehicle.startingPriceLacs)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="car-template-block">
            <h2 className="car-template-section-title">{`More from ${brand}`}</h2>
            <div className="car-template-vehicle-row">
              {moreFromBrand.map((vehicle) => (
                <article key={vehicle.id} className="car-template-vehicle-card">
                  <ResponsiveImage src={vehicle.image} alt={vehicle.title} ratio="16 / 10" placeholderLabel={vehicle.title} />
                  <h3>{vehicle.title}</h3>
                  <p className="car-template-vehicle-rating">{formatRatingOutOfTen(vehicle.rating)}</p>
                  <p>{formatPriceInLacs(vehicle.startingPriceLacs)}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </PageContainer>
    </section>
  );
}
