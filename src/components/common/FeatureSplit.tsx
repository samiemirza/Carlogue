import type { Article } from "../../types";
import { FeatureStory } from "../cards/FeatureStory";
import { SidebarStoryList } from "../cards/SidebarStoryList";

type FeatureSplitProps = {
  feature: Article;
  sidebar: Article[];
};

export function FeatureSplit({ feature, sidebar }: FeatureSplitProps) {
  return (
    <div className="feature-split">
      <FeatureStory article={feature} largeTitle />
      <SidebarStoryList stories={sidebar} />
    </div>
  );
}
