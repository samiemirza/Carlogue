import { ArticleGrid } from "../components/common/ArticleGrid";
import { FeatureSplit } from "../components/common/FeatureSplit";
import { HeroWithGrid } from "../components/common/HeroWithGrid";
import { SectionHeader } from "../components/common/SectionHeader";
import { HeroCarousel } from "../components/home/HeroCarousel";
import { PageContainer } from "../components/layout/PageContainer";
import { ResearchSearchPanel } from "../components/search/ResearchSearchPanel";
import { Link } from "react-router-dom";
import {
  buyersGuideArticles,
  buyersGuideHero,
  carCategories,
  featuredMain,
  featuredSidebar,
  homepageSlides,
  latestReviews,
  popularCars,
} from "../data/siteData";

export function HomePage() {
  const dynamicBuyerGuides = [...buyersGuideArticles].sort((first, second) => (second.traction ?? 0) - (first.traction ?? 0));

  return (
    <div className="home-page">
      <section className="section home-hero-section">
        <PageContainer>
          <HeroCarousel slides={homepageSlides} />
        </PageContainer>
      </section>

      <ResearchSearchPanel categories={carCategories} />

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
          <SectionHeader title="Featured" />
          <FeatureSplit feature={featuredMain} sidebar={featuredSidebar} />
          <div className="section-action">
            <Link to="/news-stories" className="outline-button">
              VIEW ALL
            </Link>
          </div>
        </PageContainer>
      </section>

      <section className="section section-tight-top">
        <PageContainer>
          <SectionHeader title="Popular Cars" />
          <ArticleGrid articles={popularCars} />
          <div className="section-action">
            <Link to="/shop-new-cars#popular-cars" className="outline-button">
              VIEW ALL
            </Link>
          </div>
        </PageContainer>
      </section>

      <section className="section section-tight-top" id="buyers-guide">
        <PageContainer>
          <SectionHeader
            title="Buyer's Guide"
            description="This placeholder block is already wired for dynamic ordering by traction score."
          />
          <HeroWithGrid hero={buyersGuideHero} cards={dynamicBuyerGuides} heroRatio="2.15 / 1" />
        </PageContainer>
      </section>
    </div>
  );
}
