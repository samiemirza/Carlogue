import { HeroWithGrid } from "../components/common/HeroWithGrid";
import { SectionHeader } from "../components/common/SectionHeader";
import { PageContainer } from "../components/layout/PageContainer";
import {
  columnsArticles,
  columnsHero,
  internationalArticles,
  internationalHero,
  newsStoriesHero,
  newsStoriesTopColumns,
} from "../data/siteData";
import type { Article } from "../types";

function withoutCategory(article: Article): Article {
  return {
    ...article,
    category: undefined,
  };
}

export function NewsStoriesPage() {
  const cleanNewsStoriesHero = withoutCategory(newsStoriesHero);
  const cleanNewsStoriesTopColumns = newsStoriesTopColumns.map(withoutCategory);
  const cleanColumnsHero = withoutCategory(columnsHero);
  const cleanColumnsArticles = columnsArticles.map(withoutCategory);
  const cleanInternationalHero = withoutCategory(internationalHero);
  const cleanInternationalArticles = internationalArticles.map(withoutCategory);

  return (
    <>
      <section className="section">
        <PageContainer>
          <SectionHeader title="Top Story" />
          <HeroWithGrid hero={cleanNewsStoriesHero} cards={cleanNewsStoriesTopColumns} />
        </PageContainer>
      </section>

      <section className="section section-tight-top news-columns-section">
        <PageContainer>
          <SectionHeader title="Columns" />
          <HeroWithGrid hero={cleanColumnsHero} cards={cleanColumnsArticles} />
        </PageContainer>
      </section>

      <section className="section section-tight-top">
        <PageContainer>
          <SectionHeader title="International News" />
          <HeroWithGrid hero={cleanInternationalHero} cards={cleanInternationalArticles} />
        </PageContainer>
      </section>
    </>
  );
}
