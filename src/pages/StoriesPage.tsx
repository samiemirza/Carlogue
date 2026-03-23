import { useMemo, useState } from "react";
import { FeatureSplit } from "../components/common/FeatureSplit";
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

type NewsSort = "newest" | "oldest";

function normalizeStory(article: Article, category: string): Article {
  return {
    ...article,
    category,
    excerpt: undefined,
  };
}

function getPublishedTimestamp(article: Article): number {
  if (!article.publishedAt) {
    return 0;
  }

  const parsed = Date.parse(article.publishedAt);
  return Number.isNaN(parsed) ? 0 : parsed;
}

const storiesFeed: Article[] = [
  normalizeStory(newsStoriesHero, "News"),
  ...newsStoriesTopColumns.map((article) => normalizeStory(article, "News")),
  normalizeStory(columnsHero, "Columns"),
  ...columnsArticles.map((article) => normalizeStory(article, "Columns")),
  normalizeStory(internationalHero, "International"),
  ...internationalArticles.map((article) => normalizeStory(article, "International")),
].sort((a, b) => getPublishedTimestamp(b) - getPublishedTimestamp(a));

function chunkStories(articles: Article[], chunkSize: number): Article[][] {
  const chunks: Article[][] = [];

  for (let index = 0; index < articles.length; index += chunkSize) {
    chunks.push(articles.slice(index, index + chunkSize));
  }

  return chunks;
}

export function StoriesPage() {
  const [sortOrder, setSortOrder] = useState<NewsSort>("newest");

  const orderedStories = useMemo(() => {
    const sorted = [...storiesFeed];
    if (sortOrder === "oldest") {
      return sorted.reverse();
    }

    return sorted;
  }, [sortOrder]);

  return (
    <div className="stories-page">
      <PageContainer>
        <section className="stories-intro">
          <img src="/images/home/featured-collage.jpg" alt="News" className="stories-intro-image" loading="lazy" />

          <div className="stories-header-row">
            <h1>News</h1>

            <div className="stories-filter-control">
              <label htmlFor="stories-filter" className="visually-hidden">
                Sort news
              </label>
              <select
                id="stories-filter"
                className="stories-filter-select"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value as NewsSort)}
              >
                <option value="newest">Sort: Newest</option>
                <option value="oldest">Sort: Oldest</option>
              </select>
            </div>
          </div>
        </section>

        <section className="section section-tight-top stories-list-section">
          <div className="stories-banded-list">
            {chunkStories(orderedStories, 5).map((storyChunk, chunkIndex) => {
              const heroArticle = storyChunk[0];
              if (!heroArticle) {
                return null;
              }

              return (
                <div key={`stories-band-${chunkIndex + 1}`} className="stories-feature-group">
                  <FeatureSplit feature={heroArticle} sidebar={storyChunk.slice(1, 5)} reverse={chunkIndex % 2 === 1} />
                </div>
              );
            })}
          </div>
        </section>
      </PageContainer>
    </div>
  );
}
