import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArticleGrid } from "../components/common/ArticleGrid";
import { SectionHeader } from "../components/common/SectionHeader";
import { PageContainer } from "../components/layout/PageContainer";
import { ResearchSearchPanel } from "../components/search/ResearchSearchPanel";
import { carCategories, futureCars, popularCars } from "../data/siteData";
import { buildBrandRoute, type CarSearchFilters, findCarForSearch } from "../utils/carSearch";

export function ShopNewCarsPage() {
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
  }

  return (
    <>
      <ResearchSearchPanel categories={carCategories} cars={allNewCars} onSearchSubmit={handleResearchSubmit} />

      <section className="section" id="popular-cars">
        <PageContainer>
          <SectionHeader title="Popular Cars" />
          <ArticleGrid articles={popularCars} className="car-card-grid" cardMode="car" />
        </PageContainer>
      </section>

      <section className="section section-tight-top">
        <PageContainer>
          <SectionHeader title="Future Cars" description="Placeholder cards for upcoming launches." />
          <ArticleGrid articles={futureCars} className="car-card-grid" cardMode="car" />
        </PageContainer>
      </section>
    </>
  );
}
