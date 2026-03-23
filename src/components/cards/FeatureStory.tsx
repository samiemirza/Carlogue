import type { Article } from "../../types";
import { ResponsiveImage } from "../common/ResponsiveImage";

type FeatureStoryProps = {
  article: Article;
  largeTitle?: boolean;
  ratio?: string;
  showExcerpt?: boolean;
};

export function FeatureStory({ article, largeTitle = false, ratio = "16 / 10", showExcerpt = true }: FeatureStoryProps) {
  return (
    <article className="feature-story">
      <ResponsiveImage src={article.image} alt={article.title} ratio={ratio} placeholderLabel={article.category ?? "Feature"} />
      {article.category ? <p className="eyebrow">{article.category}</p> : null}
      <h3 className={largeTitle ? "feature-title-large" : ""}>{article.title}</h3>
      {showExcerpt && article.excerpt ? <p>{article.excerpt}</p> : null}
    </article>
  );
}
