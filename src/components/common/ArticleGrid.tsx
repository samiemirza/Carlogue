import type { Article } from "../../types";
import { StoryCard } from "../cards/StoryCard";

type ArticleGridProps = {
  articles: Article[];
  titleClamp?: number;
  className?: string;
  cardClassName?: string;
  cardMode?: "default" | "car";
};

export function ArticleGrid({
  articles,
  titleClamp = 2,
  className = "",
  cardClassName = "",
  cardMode = "default",
}: ArticleGridProps) {
  return (
    <div className={`story-grid ${className}`.trim()}>
      {articles.map((article) => (
        <StoryCard key={article.id} article={article} titleClamp={titleClamp} className={cardClassName} mode={cardMode} />
      ))}
    </div>
  );
}
