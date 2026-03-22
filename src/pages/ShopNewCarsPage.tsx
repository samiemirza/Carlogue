import { ArticleGrid } from "../components/common/ArticleGrid";
import { SectionHeader } from "../components/common/SectionHeader";
import { PageContainer } from "../components/layout/PageContainer";
import { ResearchSearchPanel } from "../components/search/ResearchSearchPanel";
import { carCategories, futureCars, popularCars } from "../data/siteData";

export function ShopNewCarsPage() {
  return (
    <>
      <ResearchSearchPanel categories={carCategories} />

      <section className="section" id="popular-cars">
        <PageContainer>
          <SectionHeader title="Popular Cars" />
          <ArticleGrid articles={popularCars} />
        </PageContainer>
      </section>

      <section className="section section-tight-top">
        <PageContainer>
          <SectionHeader title="Future Cars" description="Placeholder cards for upcoming launches." />
          <ArticleGrid articles={futureCars} />
        </PageContainer>
      </section>
    </>
  );
}
