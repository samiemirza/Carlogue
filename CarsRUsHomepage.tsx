import React from "react";

const navItems = [
  "Shop New Cars",
  "Expert Reviews",
  "News + Stories",
  "What’s My Car Worth",
];

const latestReviews = [
  {
    title: "2026 Dodge Charger R/T: The Lesser of Two Sixes",
    image: "/images/home/latest-review-01.jpg",
  },
  {
    title: "Driven: The 2027 Chevrolet Bolt Strikes Back",
    image: "/images/home/latest-review-02.jpg",
  },
  {
    title: "Don’t Fat-Shame the Audi RS5 Until You Drive It",
    image: "/images/home/latest-review-03.jpg",
  },
  {
    title: "Driven: 2026 Trailseeker Is the Subaru Driver’s EV",
    image: "/images/home/latest-review-04.jpg",
  },
];

const featuredSidebar = [
  "Beretta vs. Beretta",
  "The Bestselling Car the Year You Graduated",
  "The Most Fuel-Efficient Cars That Aren’t Hybrids",
  "Best Affordable Performance Cars, Trucks, and SUVs",
];

const popularCars = [
  { title: "2026 Honda Prelude", image: "/images/home/popular-01.jpg" },
  { title: "2027 Kia Telluride", image: "/images/home/popular-02.jpg" },
  { title: "2027 BMW iX3", image: "/images/home/popular-03.jpg" },
  { title: "2027 Ram 1500 SRT TRX", image: "/images/home/popular-04.jpg" },
];

const buyersGuide = [
  { title: "Best New-Car Lease Deals for March 2026", image: "/images/home/buyers-guide-01.jpg" },
  { title: "How to Buy or Lease a New Car", image: "/images/home/buyers-guide-02.jpg" },
  { title: "Your Guide to Buying a New EV in 2026", image: "/images/home/buyers-guide-03.jpg" },
  { title: "How to Maintain Your Car to Keep It Running Well", image: "/images/home/buyers-guide-04.jpg" },
];

const categories = [
  "SUVs",
  "Sedans",
  "Hatchbacks",
  "Crossovers",
  "EVs",
  "Luxury",
  "Performance",
  "Used Cars",
  "Hybrid",
  "Pickup",
  "Vans",
  "Price Range",
];

const TOKENS = {
  page: "#FCFCFC",
  surface: "#FFFFFF",
  text: "#111111",
  border: "#D9D9D9",
  muted: "#6C7278",
  teal: "#3095B4",
  footer: "#025172",
  news: "#0A9A4B",
};

function PageContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-7">
      <h2
        className="font-[800] uppercase tracking-[-0.02em] text-[22px] leading-[1.02] sm:text-[24px] lg:text-[22px]"
        style={{ color: TOKENS.text, fontFamily: '"Inter Tight", "SF Pro Display", Inter, system-ui, sans-serif' }}
      >
        {title}
      </h2>
    </div>
  );
}

function ImageSlot({ src, alt, className = "", ratio = "aspect-[4/3]" }: { src?: string; alt: string; className?: string; ratio?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[10px] bg-neutral-200 ${ratio} ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-neutral-200 text-[12px] font-medium uppercase tracking-[0.08em] text-neutral-500">
          Image
        </div>
      )}
    </div>
  );
}

function StoryCard({ title, image, titleClassName = "" }: { title: string; image?: string; titleClassName?: string }) {
  return (
    <article className="group">
      <ImageSlot src={image} alt={title} />
      <h3
        className={`mt-2.5 text-[13px] font-[700] leading-[1.15] tracking-[-0.01em] text-black sm:text-[14px] ${titleClassName}`}
        style={{ fontFamily: 'Inter, "SF Pro Text", system-ui, sans-serif' }}
      >
        {title}
      </h3>
    </article>
  );
}

function SidebarStory({ title }: { title: string }) {
  return (
    <article className="flex items-start gap-3 border-b border-black/8 pb-3 last:border-b-0 last:pb-0">
      <div className="h-14 w-20 shrink-0 overflow-hidden rounded-[8px] bg-neutral-200" />
      <h4
        className="text-[12.5px] font-[700] leading-[1.15] tracking-[-0.01em] text-black"
        style={{ fontFamily: 'Inter, "SF Pro Text", system-ui, sans-serif' }}
      >
        {title}
      </h4>
    </article>
  );
}

function SearchInput({ label, button = false }: { label: string; button?: boolean }) {
  return (
    <button
      className={`h-11 rounded-[10px] border text-left text-[11px] font-[600] uppercase tracking-[0.04em] transition ${
        button
          ? "border-[#3095B4] bg-[#3095B4] text-white hover:opacity-95"
          : "border-black/35 bg-white px-4 text-black hover:border-black/55"
      }`}
      style={{ fontFamily: 'Inter, "SF Pro Text", system-ui, sans-serif' }}
    >
      <span className={button ? "flex items-center justify-center" : "block"}>{label}</span>
    </button>
  );
}

function CategoryTile({ label, featured = false }: { label: string; featured?: boolean }) {
  return (
    <div className="flex aspect-[1.06/1] flex-col items-center justify-center rounded-[10px] bg-white p-4 text-center">
      {featured ? (
        <>
          <div className="mb-3 h-10 w-14 rounded-md border border-black/15 bg-neutral-100" />
          <span
            className="text-[12px] font-[700] uppercase tracking-[0.03em] text-neutral-700"
            style={{ fontFamily: 'Inter, "SF Pro Text", system-ui, sans-serif' }}
          >
            {label}
          </span>
        </>
      ) : (
        <span
          className="max-w-[8ch] text-[18px] font-[800] leading-[1.02] tracking-[-0.03em] text-black"
          style={{ fontFamily: '"Inter Tight", "SF Pro Display", Inter, system-ui, sans-serif' }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

export default function CarsRUsHomepage() {
  return (
    <div className="min-h-screen bg-[#FCFCFC] text-[#111111]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Inter+Tight:wght@700;800&display=swap');
        html { scroll-behavior: smooth; }
        body { background: ${TOKENS.page}; }
      `}</style>

      <div className="h-3 w-full bg-[#025172]" />

      <header className="border-b border-black/10 bg-[#FCFCFC]">
        <PageContainer>
          <div className="flex h-14 items-center justify-center">
            <nav className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 lg:gap-9">
              {navItems.map((item, index) => {
                const active = index === 0;
                return (
                  <a
                    key={item}
                    href="#"
                    className="relative pb-1 text-[11px] font-[700] uppercase tracking-[0.04em] text-black/85 transition hover:text-black"
                    style={{ fontFamily: 'Inter, "SF Pro Text", system-ui, sans-serif' }}
                  >
                    {item}
                    {active && <span className="absolute inset-x-0 -bottom-[11px] h-[3px] rounded-full bg-[#3095B4]" />}
                  </a>
                );
              })}
            </nav>
          </div>
        </PageContainer>
      </header>

      <main>
        <section className="py-8 sm:py-10 lg:py-12">
          <PageContainer>
            <div className="grid grid-cols-[48px,1fr,48px] items-center gap-4 lg:grid-cols-[72px,1fr,72px]">
              <button className="flex h-10 w-10 items-center justify-center rounded-full text-4xl font-light text-black/20 transition hover:text-black/35">
                ‹
              </button>

              <div className="mx-auto w-full max-w-[920px]">
                <ImageSlot
                  src="/images/home/hero-kia-telluride.jpg"
                  alt="KIA Telluride hero"
                  ratio="aspect-[16/9]"
                  className="rounded-[18px]"
                />

                <div className="mt-4">
                  <div
                    className="mb-2 text-[11px] font-[800] uppercase tracking-[0.08em] text-[#0A9A4B]"
                    style={{ fontFamily: 'Inter, "SF Pro Text", system-ui, sans-serif' }}
                  >
                    News
                  </div>
                  <h1
                    className="max-w-[14ch] text-[28px] font-[800] leading-[0.98] tracking-[-0.04em] sm:text-[36px] lg:text-[48px]"
                    style={{ fontFamily: '"Inter Tight", "SF Pro Display", Inter, system-ui, sans-serif' }}
                  >
                    KIA Telluride lands in Pakistan, bookings open in April
                  </h1>
                </div>
              </div>

              <button className="flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-4xl font-light text-black/20 transition hover:text-black/35">
                ›
              </button>
            </div>
          </PageContainer>
        </section>

        <section className="bg-[#3095B4] py-14 sm:py-16 lg:py-[64px]">
          <PageContainer>
            <h2
              className="mb-8 text-center text-[26px] font-[800] leading-[1.02] tracking-[-0.03em] text-white lg:text-[34px]"
              style={{ fontFamily: '"Inter Tight", "SF Pro Display", Inter, system-ui, sans-serif' }}
            >
              Explore New Cars in Pakistan
            </h2>

            <div className="mx-auto max-w-[920px] rounded-[12px] bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.03)] sm:p-5 lg:p-6">
              <div
                className="mb-4 text-center text-[12px] font-[700] tracking-[-0.01em] text-black"
                style={{ fontFamily: 'Inter, "SF Pro Text", system-ui, sans-serif' }}
              >
                Research by Make
              </div>
              <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_112px]">
                <SearchInput label="Select Make" />
                <SearchInput label="Select Model" />
                <SearchInput label="Select Year" />
                <SearchInput label="Go" button />
              </div>
            </div>

            <div className="mx-auto mt-5 grid max-w-[920px] grid-cols-2 gap-[18px] sm:grid-cols-3 lg:grid-cols-4">
              {categories.map((category, index) => (
                <CategoryTile key={category} label={category} featured={index === 0} />
              ))}
            </div>
          </PageContainer>
        </section>

        <section className="py-16 lg:py-20">
          <PageContainer>
            <SectionHeader title="Latest Reviews" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {latestReviews.map((item) => (
                <StoryCard key={item.title} title={item.title} image={item.image} />
              ))}
            </div>
          </PageContainer>
        </section>

        <section className="pb-16 lg:pb-20">
          <PageContainer>
            <SectionHeader title="Featured" />
            <div className="grid gap-6 lg:grid-cols-[1.7fr,0.8fr]">
              <article>
                <ImageSlot src="/images/home/featured-collage.jpg" alt="Featured collage" ratio="aspect-[1.42/1]" className="rounded-[10px]" />
                <h3
                  className="mt-4 max-w-[15ch] text-[30px] font-[800] leading-[0.98] tracking-[-0.04em] text-[#1C5C8A] lg:text-[40px]"
                  style={{ fontFamily: '"Inter Tight", "SF Pro Display", Inter, system-ui, sans-serif' }}
                >
                  Future Cars Worth Waiting For: 2026-2030
                </h3>
                <p
                  className="mt-2 max-w-[65ch] text-[14px] leading-[1.55] text-black/80"
                  style={{ fontFamily: 'Inter, "SF Pro Text", system-ui, sans-serif' }}
                >
                  Our sneak peek at the most promising cars, trucks, and SUVs of the next few years.
                </p>
              </article>

              <aside className="space-y-4 lg:pt-1">
                {featuredSidebar.map((story) => (
                  <SidebarStory key={story} title={story} />
                ))}
              </aside>
            </div>
          </PageContainer>
        </section>

        <section className="pb-16 lg:pb-20">
          <PageContainer>
            <SectionHeader title="Popular Cars" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {popularCars.map((item) => (
                <StoryCard key={item.title} title={item.title} image={item.image} />
              ))}
            </div>
          </PageContainer>
        </section>

        <section className="pb-20 lg:pb-24">
          <PageContainer>
            <SectionHeader title="Buyer’s Guide" />

            <article>
              <ImageSlot src="/images/home/buyers-guide-hero.jpg" alt="Buyer guide hero" ratio="aspect-[2.15/1]" className="rounded-[0px]" />
              <h3
                className="mt-4 max-w-[15ch] text-[32px] font-[800] leading-[0.97] tracking-[-0.045em] text-black lg:text-[52px]"
                style={{ fontFamily: '"Inter Tight", "SF Pro Display", Inter, system-ui, sans-serif' }}
              >
                2026 Editors&apos; Choice: The Best New Vehicles On Sale
              </h3>
            </article>

            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {buyersGuide.map((item) => (
                <StoryCard key={item.title} title={item.title} image={item.image} titleClassName="max-w-[13ch]" />
              ))}
            </div>
          </PageContainer>
        </section>
      </main>

      <footer className="mt-10 h-[280px] bg-[#025172]" />
    </div>
  );
}
