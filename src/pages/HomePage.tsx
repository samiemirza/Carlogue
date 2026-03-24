import { useMemo } from "react";
import { ArticleGrid } from "../components/common/ArticleGrid";
import { FeatureSplit } from "../components/common/FeatureSplit";
import { ResponsiveImage } from "../components/common/ResponsiveImage";
import { SectionHeader } from "../components/common/SectionHeader";
import { HeroCarousel } from "../components/home/HeroCarousel";
import { PageContainer } from "../components/layout/PageContainer";
import { ResearchSearchPanel } from "../components/search/ResearchSearchPanel";
import { Link, useNavigate } from "react-router-dom";
import {
  carCategories,
  buyersGuideHero,
  featuredMain,
  featuredSidebar,
  futureCars,
  homepageSlides,
  latestReviews,
  popularCars,
} from "../data/siteData";
import { buildBrandRoute, type CarSearchFilters, findCarForSearch } from "../utils/carSearch";

const buyersGuideCards = [
  { title: "First Time Buyer", subtitle: "Start with confidence", image: "/images/firsttime.png" },
  { title: "Used Car Checklist", subtitle: "Inspect before buying", image: "/images/used.png" },
  { title: "Car Ownership Guide", subtitle: "Maintain and protect", image: "/images/ownership.png" },
  { title: "Car Finance and Loans", subtitle: "Plan your budget", image: "/images/finance.png" },
];

export function HomePage() {
  const navigate = useNavigate();
  const allNewCars = useMemo(() => [...popularCars, ...futureCars], []);

  function handleResearchSubmit(filters: CarSearchFilters) {
    if (filters.model) {
      const matchedCar = findCarForSearch(allNewCars, filters);
      if (matchedCar) {
        navigate(`/cars/${encodeURIComponent(matchedCar.id)}`);
        return;
      }
    }

    if (filters.brand) {
      navigate(buildBrandRoute(filters.brand));
      return;
    }

    navigate("/shop-new-cars");
  }

  return (
    <div className="home-page">
      <section className="section home-hero-section">
        <PageContainer>
          <HeroCarousel slides={homepageSlides} />
        </PageContainer>
      </section>

      <ResearchSearchPanel categories={carCategories} cars={allNewCars} onSearchSubmit={handleResearchSubmit} />

      <section className="section">
        <PageContainer>
          <SectionHeader title="Latest Reviews" />
          <ArticleGrid articles={latestReviews} />
          <div className="section-action">
            <Link to="/expert-reviews" className="outline-button">
              VIEW ALL
            </Link>
          </div>
        </PageContainer>
      </section>

      <section className="section section-tight-top">
        <PageContainer>
          <SectionHeader title="Popular Cars" />
          <ArticleGrid articles={popularCars} className="car-card-grid" cardMode="car" />
          <div className="section-action">
            <Link to="/shop-new-cars#popular-cars" className="outline-button">
              VIEW ALL
            </Link>
          </div>
        </PageContainer>
      </section>

      <section className="section section-tight-top" id="buyers-guide">
        <PageContainer>
          <SectionHeader title="Buyer's Guide" />

          <div className="buyers-guide-layout" aria-label="Buyer's guide placeholders">
            <article className="buyers-guide-banner">
              <img src={buyersGuideHero.image} alt={buyersGuideHero.title} className="buyers-guide-banner-image" loading="lazy" />
              <span className="visually-hidden">Buyer's Guide Feature Banner</span>
            </article>

            <div className="buyers-guide-card-grid">
              {buyersGuideCards.map((card) => (
                <article key={card.title} className="buyers-guide-card">
                  <ResponsiveImage src={card.image} alt={card.title} ratio="16 / 10" className="buyers-guide-card-icon" placeholderLabel={card.title} />
                  <h3>{card.title}</h3>
                  <p>{card.subtitle}</p>
                  <span className="visually-hidden">{`Buyer's Guide: ${card.title}`}</span>
                </article>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="section section-tight-top">
        <PageContainer>
          <SectionHeader title="Featured" />
          <FeatureSplit feature={featuredMain} sidebar={featuredSidebar} />
          <div className="section-action">
            <Link to="/news-stories" className="outline-button">
              VIEW ALL
            </Link>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
