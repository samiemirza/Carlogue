import type { Article } from "../../types";
import { StoryCard } from "../cards/StoryCard";

type ArticleGridProps = {
  articles: Article[];
  titleClamp?: number;
};

export function ArticleGrid({ articles, titleClamp = 2 }: ArticleGridProps) {
  return (
    <div className="story-grid">
      {articles.map((article) => (
        <StoryCard key={article.id} article={article} titleClamp={titleClamp} />
      ))}
    </div>
  );
}
