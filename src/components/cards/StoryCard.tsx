import type { Article } from "../../types";
import { ResponsiveImage } from "../common/ResponsiveImage";

type StoryCardProps = {
  article: Article;
  titleClamp?: number;
  compact?: boolean;
};

export function StoryCard({ article, titleClamp = 2, compact = false }: StoryCardProps) {
  return (
    <article className={`story-card ${compact ? "is-compact" : ""}`.trim()}>
      <ResponsiveImage
        src={article.image}
        alt={article.title}
        ratio={compact ? "16 / 10" : "4 / 3"}
        placeholderLabel={article.category ?? article.title}
      />
      {article.category ? <p className="eyebrow">{article.category}</p> : null}
      <h3 style={{ WebkitLineClamp: titleClamp }}>{article.title}</h3>
      {article.excerpt && !compact ? <p className="story-excerpt">{article.excerpt}</p> : null}
    </article>
  );
}
