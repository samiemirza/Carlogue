import type { CategoryTileData } from "../../types";
import { CategoryTile } from "./CategoryTile";
import { PageContainer } from "../layout/PageContainer";

type ResearchSearchPanelProps = {
  categories: CategoryTileData[];
};

export function ResearchSearchPanel({ categories }: ResearchSearchPanelProps) {
  return (
    <section className="research-band" aria-label="Explore new cars">
      <PageContainer>
        <h2>Explore New Cars in Pakistan</h2>

        <div className="research-search-card">
          <p>Research by Make</p>
          <form className="research-form" onSubmit={(event) => event.preventDefault()}>
            <label>
              <span className="visually-hidden">Select Make</span>
              <select defaultValue="">
                <option value="" disabled>
                  Select Make
                </option>
                <option>Toyota</option>
                <option>Honda</option>
                <option>KIA</option>
              </select>
            </label>

            <label>
              <span className="visually-hidden">Select Model</span>
              <select defaultValue="">
                <option value="" disabled>
                  Select Model
                </option>
                <option>Corolla</option>
                <option>Civic</option>
                <option>Sportage</option>
              </select>
            </label>

            <label>
              <span className="visually-hidden">Select Year</span>
              <select defaultValue="">
                <option value="" disabled>
                  Select Year
                </option>
                <option>2026</option>
                <option>2025</option>
                <option>2024</option>
              </select>
            </label>

            <button type="submit">Go</button>
          </form>
        </div>

        <div className="category-grid" role="list" aria-label="Car categories">
          {categories.map((category) => (
            <CategoryTile key={category.id} category={category} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
