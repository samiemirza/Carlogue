import { useEffect, useMemo, useState } from "react";
import type { Article } from "../../types";
import { StoryCard } from "../cards/StoryCard";
import { ResponsiveImage } from "./ResponsiveImage";
import { ArticleGrid } from "./ArticleGrid";

type ExpandableReviewGridProps = {
  articles: Article[];
  heroArticle?: Article;
  initialCount?: number;
  incrementBy?: number;
  buttonLabel?: string;
};

export function ExpandableReviewGrid({
  articles,
  heroArticle,
  initialCount = 8,
  incrementBy = 8,
  buttonLabel = "VIEW MORE",
}: ExpandableReviewGridProps) {
  const safeInitialCount = Math.max(1, initialCount);
  const safeIncrementBy = Math.max(1, incrementBy);
  const [visibleCount, setVisibleCount] = useState(safeInitialCount);

  useEffect(() => {
    setVisibleCount(safeInitialCount);
  }, [safeInitialCount, articles.length]);

  const visibleArticles = useMemo(() => articles.slice(0, visibleCount), [articles, visibleCount]);
  const heroSideArticles = useMemo(() => visibleArticles.slice(0, 4), [visibleArticles]);
  const remainingArticles = useMemo(() => visibleArticles.slice(4), [visibleArticles]);
  const hasMore = visibleCount < articles.length;
  const isExpanded = visibleCount > safeInitialCount;

  function handleViewAll() {
    setVisibleCount((previousCount) => Math.min(previousCount + safeIncrementBy, articles.length));
  }

  function handleClose() {
    setVisibleCount(safeInitialCount);
  }

  return (
    <div>
      {heroArticle ? (
        <div className="reviews-hero-grid">
          <article className="reviews-hero-card">
            <ResponsiveImage
              src={heroArticle.image}
              alt={heroArticle.title}
              ratio="13 / 10"
              placeholderLabel={heroArticle.category ?? "Review"}
            />
            {heroArticle.category ? <p className="eyebrow">{heroArticle.category}</p> : null}
            <h3>{heroArticle.title}</h3>
            {heroArticle.excerpt ? <p className="story-excerpt">{heroArticle.excerpt}</p> : null}
          </article>

          <div className="reviews-hero-side-grid">
            {heroSideArticles.map((article) => (
              <StoryCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      ) : null}

      {(heroArticle ? remainingArticles : visibleArticles).length ? (
        <ArticleGrid articles={heroArticle ? remainingArticles : visibleArticles} />
      ) : null}

      {hasMore || isExpanded ? (
        <div className="section-action reviews-expand-actions">
          {isExpanded ? (
            <button type="button" className="reviews-close-button" onClick={handleClose}>
              CLOSE
              <span className="reviews-close-x" aria-hidden="true">
                ×
              </span>
            </button>
          ) : null}

          {hasMore ? (
            <button type="button" className="reviews-view-all-button" onClick={handleViewAll}>
              {buttonLabel}
              <span className="reviews-view-all-arrow" aria-hidden="true">
                ▾
              </span>
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
