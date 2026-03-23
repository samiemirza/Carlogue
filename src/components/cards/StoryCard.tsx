import type { Article } from "../../types";
import { ResponsiveImage } from "../common/ResponsiveImage";
import { Link } from "react-router-dom";

type StoryCardProps = {
  article: Article;
  titleClamp?: number;
  compact?: boolean;
  className?: string;
  mode?: "default" | "car";
  rankLabel?: string;
  highlight?: boolean;
};

function formatCarRating(rating?: number): string {
  const safeRating = typeof rating === "number" && Number.isFinite(rating) ? Math.min(5, Math.max(0, rating)) : 4.5;
  return `${safeRating.toFixed(1)}/5`;
}

function formatPriceInLacs(startingPriceLacs?: number): string {
  const safePrice = typeof startingPriceLacs === "number" && Number.isFinite(startingPriceLacs) ? Math.max(0, startingPriceLacs) : 100;
  return `PKR ${safePrice.toLocaleString("en-PK")} lacs`;
}

export function StoryCard({
  article,
  titleClamp = 2,
  compact = false,
  className = "",
  mode = "default",
  rankLabel,
  highlight = false,
}: StoryCardProps) {
  const isCarCard = mode === "car";
  const carDetailsHref = article.href ?? `/cars/${encodeURIComponent(article.id)}`;

  return (
    <article
      className={`story-card ${compact ? "is-compact" : ""} ${isCarCard ? "is-car-card" : ""} ${highlight ? "is-current-review" : ""} ${className}`.trim()}
    >
      {isCarCard ? (
        <div className="car-card-header">
          <h3 className="car-card-title" style={{ WebkitLineClamp: titleClamp }}>
            {article.title}
          </h3>
          <p className="car-card-rating">{formatCarRating(article.rating)}</p>
        </div>
      ) : null}

      <div className={`car-card-image-wrap ${rankLabel ? "has-rank-sticker" : ""}`.trim()}>
        <ResponsiveImage
          src={article.image}
          alt={article.title}
          ratio={compact ? "16 / 10" : "4 / 3"}
          placeholderLabel={article.category ?? article.title}
        />
        {rankLabel ? (
          <span className="car-card-rank-sticker" aria-label={`Rank ${rankLabel.replace("#", "")}`}>
            {rankLabel}
          </span>
        ) : null}
      </div>
      {isCarCard ? (
        <div className="car-card-price-row">
          <p className="car-card-price">
            <span className="car-card-price-label">Starting from</span>
            <span className="car-card-price-value">{formatPriceInLacs(article.startingPriceLacs)}</span>
          </p>
          <Link className="car-card-arrow-link" to={carDetailsHref} aria-label={`Open ${article.title}`}>
            &gt;&gt;&gt;
          </Link>
        </div>
      ) : null}
      {!isCarCard && article.category ? <p className="eyebrow">{article.category}</p> : null}
      {!isCarCard ? <h3 style={{ WebkitLineClamp: titleClamp }}>{article.title}</h3> : null}
      {!isCarCard && article.excerpt && !compact ? <p className="story-excerpt">{article.excerpt}</p> : null}
    </article>
  );
}
