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
          <ResponsiveImage src={story.image} alt={story.title} ratio="4 / 3" placeholderLabel="Story" className="sidebar-thumb" />
          <div className="sidebar-story-content">
            {story.category ? <p className="eyebrow">{story.category}</p> : null}
            <h4>{story.title}</h4>
          </div>
        </article>
      ))}
    </aside>
  );
}
