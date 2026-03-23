import { FeatureSplit } from "../components/common/FeatureSplit";
import { SectionHeader } from "../components/common/SectionHeader";
import { PageContainer } from "../components/layout/PageContainer";
import { Link } from "react-router-dom";
import {
  columnsArticles,
  columnsHero,
  internationalArticles,
  internationalHero,
  newsStoriesHero,
  newsStoriesTopColumns,
} from "../data/siteData";

export function NewsStoriesPage() {
  return (
    <>
      <section className="section">
        <PageContainer>
          <SectionHeader title="Top Story" />
          <FeatureSplit feature={newsStoriesHero} sidebar={newsStoriesTopColumns} />
        </PageContainer>
      </section>

      <section className="section section-tight-top news-columns-section">
        <PageContainer>
          <SectionHeader title="Columns" />
          <FeatureSplit feature={columnsHero} sidebar={columnsArticles} />
        </PageContainer>
      </section>

      <section className="section section-tight-top">
        <PageContainer>
          <SectionHeader title="International News" />
          <FeatureSplit feature={internationalHero} sidebar={internationalArticles} />
          <div className="section-action">
            <Link to="/news-stories/stories" className="outline-button">
              VIEW ALL
            </Link>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
