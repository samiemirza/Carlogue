import type { Article } from "../../types";
import { FeatureStory } from "../cards/FeatureStory";
import { SidebarStoryList } from "../cards/SidebarStoryList";

type FeatureSplitProps = {
  feature: Article;
  sidebar: Article[];
  className?: string;
  reverse?: boolean;
};

export function FeatureSplit({ feature, sidebar, className, reverse = false }: FeatureSplitProps) {
  const classes = ["feature-split", reverse ? "is-reverse" : "", className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <FeatureStory article={feature} largeTitle showExcerpt={false} />
      <SidebarStoryList stories={sidebar} />
    </div>
  );
}
