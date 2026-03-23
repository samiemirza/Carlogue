import type { Article, CategoryTileData, NavItem } from "../types";

export const navItems: NavItem[] = [
  { label: "Shop New Cars", path: "/shop-new-cars" },
  { label: "Expert Reviews", path: "/expert-reviews" },
  { label: "News + Stories", path: "/news-stories" },
  { label: "What's My Car Worth", path: "/whats-my-car-worth" },
];

export const homepageSlides: Article[] = [
  {
    id: "slide-1",
    category: "News",
    title: "KIA Telluride lands in Pakistan, bookings open in April",
    excerpt: "Latest launch update and early booking details for Pakistan buyers.",
    image: "/images/home/hero-kia-telluride.jpg",
  },
  {
    id: "slide-2",
    category: "News",
    title: "Hybrid SUV demand grows as fuel prices continue to climb",
    excerpt: "Market demand is shifting toward efficient family crossovers.",
    image: "/images/home/hero-hybrid-suv.jpg",
  },
  {
    id: "slide-3",
    category: "News",
    title: "Three new compact sedans are expected before summer",
    excerpt: "Brand roadmaps point to tighter pricing and better feature packs.",
    image: "/images/home/hero-compact-sedan.jpg",
  },
];

export const carCategories: CategoryTileData[] = [
  { id: "suv", title: "SUVs", image: "/images/categories/suv-1585158794.png.avif" },
  { id: "sedans", title: "Sedans", image: "/images/categories/sedans-1585158794.png.avif" },
  { id: "hatchbacks", title: "Hatchbacks", image: "/images/categories/hatch-1585158793.png.avif" },
  { id: "crossovers", title: "Crossovers", image: "/images/categories/crossovers-1585158793.png.avif" },
  { id: "evs", title: "EVs", image: "/images/categories/hybridcar-647e4833d60f9.jpg.avif" },
  { id: "luxury", title: "Luxury", image: "/images/categories/luxury-1585158794.png.avif" },
  { id: "performance", title: "Performance", image: "/images/categories/small-cars-1585158793.png.avif" },
  { id: "imported", title: "Imported", image: "/images/categories/imported-1585158793.png.avif" },
  { id: "hybrid", title: "Hybrid", image: "/images/categories/hybrids-1585158794.png.avif" },
  { id: "pickup", title: "Pickup", image: "/images/categories/trucks-1585158794.png.avif" },
  { id: "vans", title: "Vans", image: "/images/categories/vans-1585158795.png.avif" },
  { id: "view-all", title: "View all" },
];

export const latestReviews: Article[] = [
  { id: "lr-1", title: "2026 Dodge Charger R/T: The Lesser of Two Sixes", image: "/images/home/latest-review-01.jpg" },
  { id: "lr-2", title: "Driven: The 2027 Chevrolet Bolt Strikes Back", image: "/images/home/latest-review-02.jpg" },
  { id: "lr-3", title: "Don't Fat-Shame the Audi RS5 Until You Drive It", image: "/images/home/latest-review-03.jpg" },
  { id: "lr-4", title: "Driven: 2026 Trailseeker Is the Subaru Driver's EV", image: "/images/home/latest-review-04.jpg" },
];

export const featuredMain: Article = {
  id: "featured-main",
  category: "News",
  title: "Future Cars Worth Waiting For: 2026-2030",
  excerpt: "A forward look at upcoming cars, trucks, and SUVs expected across the next model years.",
  image: "/images/home/featured-collage.jpg",
};

export const featuredSidebar: Article[] = [
  { id: "fs-1", title: "Beretta vs. Beretta" },
  { id: "fs-2", title: "The Bestselling Car the Year You Graduated" },
  { id: "fs-3", title: "The Most Fuel-Efficient Cars That Aren't Hybrids" },
  { id: "fs-4", title: "Best Affordable Performance Cars, Trucks, and SUVs" },
];

export const popularCars: Article[] = [
  { id: "pc-1", title: "2026 Honda Prelude", image: "/images/home/popular-01.jpg", rating: 4.6, startingPriceLacs: 122 },
  { id: "pc-2", title: "2027 Kia Telluride", image: "/images/home/popular-02.jpg", rating: 4.7, startingPriceLacs: 168 },
  { id: "pc-3", title: "2027 BMW iX3", image: "/images/home/popular-03.jpg", rating: 4.5, startingPriceLacs: 295 },
  { id: "pc-4", title: "2027 Ram 1500 SRT TRX", image: "/images/home/popular-04.jpg", rating: 4.4, startingPriceLacs: 358 },
];

export const buyersGuideHero: Article = {
  id: "buyers-hero",
  title: "2026 Editors' Choice: The Best New Vehicles On Sale",
  image: "/images/editors-choice.png",
  excerpt: "Our annual shortlist of the best vehicles across key price points.",
};

export const buyersGuideArticles: Article[] = [
  { id: "bg-1", title: "Best New-Car Lease Deals for March 2026", image: "/images/home/buyers-guide-01.jpg", traction: 51 },
  { id: "bg-2", title: "How to Buy or Lease a New Car", image: "/images/home/buyers-guide-02.jpg", traction: 72 },
  { id: "bg-3", title: "Your Guide to Buying a New EV in 2026", image: "/images/home/buyers-guide-03.jpg", traction: 66 },
  { id: "bg-4", title: "How to Maintain Your Car to Keep It Running Well", image: "/images/home/buyers-guide-04.jpg", traction: 44 },
];

export const futureCars: Article[] = [
  { id: "fc-1", title: "2027 Compact Performance Sedan", image: "/images/shop/future-01.jpg", rating: 4.3, startingPriceLacs: 98 },
  { id: "fc-2", title: "2028 Family EV Crossover", image: "/images/shop/future-02.jpg", rating: 4.5, startingPriceLacs: 142 },
  { id: "fc-3", title: "2027 Hybrid Pickup Concept", image: "/images/shop/future-03.jpg", rating: 4.2, startingPriceLacs: 176 },
  { id: "fc-4", title: "2028 Long-Range City Hatch", image: "/images/shop/future-04.jpg", rating: 4.4, startingPriceLacs: 88 },
];

export const firstDrivesTop: Article[] = [
  { id: "fdt-1", title: "First Drive: 2027 Mid-Size SUV", category: "First Drives" },
  { id: "fdt-2", title: "First Drive: Premium Electric Sedan", category: "First Drives" },
  { id: "fdt-3", title: "First Drive: Performance Hatch Refresh", category: "First Drives" },
  { id: "fdt-4", title: "First Drive: New-Gen Diesel Pickup", category: "First Drives" },
];

export const firstDriveFeature: Article = {
  id: "fd-feature",
  title: "First Drive Deep Dive: What Changed in the New Platform",
  category: "First Drives",
  excerpt: "Chassis, NVH, and drivetrain updates explained in one practical summary.",
};

export const firstDriveSidebar: Article[] = [
  { id: "fds-1", title: "Road Noise Test: Cabin Improvements" },
  { id: "fds-2", title: "Power Delivery in City vs Highway" },
  { id: "fds-3", title: "Interior Ergonomics and New Tech" },
  { id: "fds-4", title: "Who Should Upgrade This Year" },
];

export const firstDrivesBottom: Article[] = [
  { id: "fdb-1", title: "Track Impression: Turbo Compact" },
  { id: "fdb-2", title: "Road Test: Plug-in Hybrid SUV" },
  { id: "fdb-3", title: "Quick Spin: Urban EV Hatch" },
  { id: "fdb-4", title: "First Drive: Executive Sedan" },
];

export const longTermReviews: Article[] = [
  { id: "ltr-1", title: "6-Month Review: Dailying a Hybrid SUV" },
  { id: "ltr-2", title: "12-Month Review: EV Charging Reality" },
  { id: "ltr-3", title: "Long-Term Test: Budget Sedan Ownership" },
  { id: "ltr-4", title: "Year-End: Cost of Running a Performance Car" },
];

export const newsStoriesHero: Article = {
  id: "ns-hero",
  title: "Pakistan Auto Market Outlook: What to Expect Next Quarter",
  category: "News",
  publishedAt: "2026-03-23",
  excerpt: "Production, pricing, and policy trends shaping short-term decisions.",
};

export const newsStoriesTopColumns: Article[] = [
  { id: "nst-1", title: "New assembly updates from major brands", category: "News", publishedAt: "2026-03-22" },
  { id: "nst-2", title: "Policy watch: import and tax shifts", category: "News", publishedAt: "2026-03-21" },
  { id: "nst-3", title: "Dealer perspective: booking timelines", category: "News", publishedAt: "2026-03-20" },
  { id: "nst-4", title: "Supply chain snapshot for key segments", category: "News", publishedAt: "2026-03-19" },
];

export const columnsHero: Article = {
  id: "col-hero",
  title: "Columns: Why smart specs matter more than badges in 2026",
  category: "Columns",
  publishedAt: "2026-03-18",
  excerpt: "An opinionated take on how buyers should compare value.",
};

export const columnsArticles: Article[] = [
  { id: "col-1", title: "Column: The case for sensible tire sizes", category: "Columns", publishedAt: "2026-03-17" },
  { id: "col-2", title: "Column: Why service network still wins", category: "Columns", publishedAt: "2026-03-16" },
  { id: "col-3", title: "Column: Resale myths to stop repeating", category: "Columns", publishedAt: "2026-03-15" },
  { id: "col-4", title: "Column: Features that matter in traffic", category: "Columns", publishedAt: "2026-03-14" },
];

export const internationalHero: Article = {
  id: "int-hero",
  title: "International: New EV platform launches with 800V architecture",
  category: "International",
  publishedAt: "2026-03-13",
  excerpt: "Global platform updates and what they could mean for local variants.",
};

export const internationalArticles: Article[] = [
  { id: "int-1", title: "Global recalls and software fixes this week", category: "International", publishedAt: "2026-03-12" },
  { id: "int-2", title: "New safety standards in key export markets", category: "International", publishedAt: "2026-03-11" },
  { id: "int-3", title: "Battery cost trendline and range impact", category: "International", publishedAt: "2026-03-10" },
  { id: "int-4", title: "How global launches affect local pricing", category: "International", publishedAt: "2026-03-09" },
];
