import type { Article } from "../../types";
import { ResponsiveImage } from "../common/ResponsiveImage";

type SidebarStoryListProps = {
  stories: Article[];
};

export function SidebarStoryList({ stories }: SidebarStoryListProps) {
  return (
    <aside className="sidebar-story-list" aria-label="Related stories">
      {stories.map((story) => (
        <article key={story.id} className="sidebar-story-item">
          <ResponsiveImage src={story.image} alt={story.title} ratio="16 / 10" placeholderLabel="Story" className="sidebar-thumb" />
          <h4>{story.title}</h4>
        </article>
      ))}
    </aside>
  );
}
