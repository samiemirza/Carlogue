import type { CategoryTileData } from "../../types";
import { ResponsiveImage } from "../common/ResponsiveImage";

type CategoryTileProps = {
  category: CategoryTileData;
};

export function CategoryTile({ category }: CategoryTileProps) {
  if (category.id === "view-all") {
    return (
      <article className="category-tile category-view-all">
        <button type="button" className="category-view-all-button">
          View All
        </button>
      </article>
    );
  }

  return (
    <article className="category-tile">
      <ResponsiveImage
        src={category.image}
        alt={category.title}
        ratio="1.2 / 1"
        placeholderLabel={category.title}
        className="category-icon-image"
        fit="contain"
      />
      <h3>{category.title}</h3>
    </article>
  );
}
