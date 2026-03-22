import type { Article } from "../../types";
import { FeatureStory } from "../cards/FeatureStory";
import { ArticleGrid } from "./ArticleGrid";

type HeroWithGridProps = {
  hero: Article;
  cards: Article[];
  heroRatio?: string;
};

export function HeroWithGrid({ hero, cards, heroRatio = "2.2 / 1" }: HeroWithGridProps) {
  return (
    <div className="hero-with-grid">
      <FeatureStory article={hero} largeTitle ratio={heroRatio} />
      <ArticleGrid articles={cards} />
    </div>
  );
}
