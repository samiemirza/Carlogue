import { ExpandableReviewGrid } from "../components/common/ExpandableReviewGrid";
import { SectionHeader } from "../components/common/SectionHeader";
import { PageContainer } from "../components/layout/PageContainer";
import { firstDrivesBottom, firstDrivesTop, longTermReviews, latestReviews, popularCars } from "../data/siteData";
import type { Article } from "../types";

const introCopy =
  "We've been providing new car reviews for nearly 70 years. Our roster of editors, writers, and contributors is populated by automotive experts who've driven nearly every car on the market. Car and Driver's comprehensive instrumented testing regimen examines a vehicle's performance, roominess, comfort, features, fuel economy, electric driving range, value, and more.";

const firstDriveHero: Article = {
  id: "first-drive-hero",
  title: "1996 Honda Civic HX CVT Test: Who Needs Gears?",
  image: "/images/home/latest-review-01.jpg",
};

const longTermHero: Article = {
  id: "long-term-hero",
  title: "40,000 Miles Later: What We Learned from a Long-Term EV Test",
  image: "/images/home/latest-review-03.jpg",
};

const comparisonHero: Article = {
  id: "comparison-hero",
  title: "Comparison Test: Which Mid-Size SUV Is Best for Daily Family Use?",
  image: "/images/home/latest-review-02.jpg",
};

function buildReviewFeed(seedArticles: Article[], totalCount: number, idPrefix: string): Article[] {
  if (!seedArticles.length) {
    return [];
  }

  return Array.from({ length: totalCount }, (_, index) => {
    const baseArticle = seedArticles[index % seedArticles.length];
    const cycle = Math.floor(index / seedArticles.length);
    const cycleSuffix = cycle === 0 ? "" : ` (${cycle + 1})`;

    return {
      ...baseArticle,
      id: `${idPrefix}-${index + 1}`,
      title: `${baseArticle.title}${cycleSuffix}`,
      category: undefined,
    };
  });
}

const firstDriveSeed: Article[] = [...latestReviews, ...firstDrivesTop, ...firstDrivesBottom];
const longTermSeed: Article[] = [...latestReviews, ...longTermReviews];
const comparisonSeed: Article[] = [...popularCars, ...latestReviews, ...firstDrivesTop];

const firstDriveFeed = buildReviewFeed(firstDriveSeed, 24, "first-drive");
const comparisonFeed = buildReviewFeed(comparisonSeed, 16, "comparison");
const longTermFeed = buildReviewFeed(longTermSeed, 16, "long-term");

export function ExpertReviewsPage() {
  return (
    <div className="expert-reviews-page">
      <PageContainer>
        <section className="reviews-intro">
          <img src="/images/reviews.png" alt="Reviews" className="reviews-intro-image" loading="lazy" />
          <h1>Reviews</h1>
          <p>{introCopy}</p>
        </section>

        <section className="section section-tight-top reviews-section" id="first-drives">
          <SectionHeader title="First Drives" />
          <ExpandableReviewGrid heroArticle={firstDriveHero} articles={firstDriveFeed} initialCount={4} incrementBy={8} />
        </section>

        <section className="section section-tight-top reviews-section">
          <SectionHeader title="Comparison Tests" />
          <ExpandableReviewGrid heroArticle={comparisonHero} articles={comparisonFeed} initialCount={4} incrementBy={8} />
        </section>

        <section className="section section-tight-top reviews-section">
          <SectionHeader title="Long Term Tests" />
          <ExpandableReviewGrid heroArticle={longTermHero} articles={longTermFeed} initialCount={4} incrementBy={8} />
        </section>
      </PageContainer>
    </div>
  );
}
