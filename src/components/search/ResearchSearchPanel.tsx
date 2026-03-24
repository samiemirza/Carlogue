import { useMemo, useState, type FormEvent } from "react";
import type { Article, CategoryTileData } from "../../types";
import { CategoryTile } from "./CategoryTile";
import { PageContainer } from "../layout/PageContainer";
import {
  EMPTY_CAR_SEARCH_FILTERS,
  type CarSearchFilters,
  getArticleBrand,
  getArticleModel,
  normalizeCarSearchValue,
} from "../../utils/carSearch";

const FALLBACK_MAKE_OPTIONS = ["Toyota", "Honda", "KIA"];
const FALLBACK_MODEL_OPTIONS = ["Corolla", "Civic", "Sportage"];

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean))).sort((left, right) => left.localeCompare(right));
}

function isModelAvailableForBrand(cars: Article[], brand: string, model: string): boolean {
  if (!brand || !model) {
    return false;
  }

  const normalizedBrand = normalizeCarSearchValue(brand);
  const normalizedModel = normalizeCarSearchValue(model);

  return cars.some((article) => {
    if (normalizeCarSearchValue(getArticleBrand(article)) !== normalizedBrand) {
      return false;
    }

    return normalizeCarSearchValue(getArticleModel(article)) === normalizedModel;
  });
}

type ResearchSearchPanelProps = {
  categories: CategoryTileData[];
  cars?: Article[];
  filters?: CarSearchFilters;
  onFiltersChange?: (filters: CarSearchFilters) => void;
  onSearchSubmit?: (filters: CarSearchFilters) => void;
};

export function ResearchSearchPanel({ categories, cars, filters, onFiltersChange, onSearchSubmit }: ResearchSearchPanelProps) {
  const [localFilters, setLocalFilters] = useState<CarSearchFilters>(EMPTY_CAR_SEARCH_FILTERS);
  const currentYear = new Date().getFullYear();
  const activeFilters = filters ?? localFilters;
  const availableCars = cars ?? [];

  const makeOptions = useMemo(() => {
    if (!availableCars.length) {
      return FALLBACK_MAKE_OPTIONS;
    }

    return uniqueSorted(availableCars.map((article) => getArticleBrand(article)));
  }, [availableCars]);

  const carsBySelectedBrand = useMemo(() => {
    if (!availableCars.length || !activeFilters.brand) {
      return availableCars;
    }

    const normalizedBrand = normalizeCarSearchValue(activeFilters.brand);
    return availableCars.filter((article) => normalizeCarSearchValue(getArticleBrand(article)) === normalizedBrand);
  }, [availableCars, activeFilters.brand]);

  const modelOptions = useMemo(() => {
    if (!availableCars.length) {
      return FALLBACK_MODEL_OPTIONS;
    }

    const source = activeFilters.brand ? carsBySelectedBrand : availableCars;
    return uniqueSorted(source.map((article) => getArticleModel(article)));
  }, [availableCars, carsBySelectedBrand, activeFilters.brand]);

  function commitFilters(nextFilters: CarSearchFilters) {
    if (onFiltersChange) {
      onFiltersChange(nextFilters);
      return;
    }

    setLocalFilters(nextFilters);
  }

  function handleMakeChange(nextBrand: string) {
    let nextModel = activeFilters.model;
    let nextYear = activeFilters.year;
    if (!nextBrand || !isModelAvailableForBrand(availableCars, nextBrand, nextModel)) {
      nextModel = "";
      nextYear = "";
    }

    commitFilters({
      ...activeFilters,
      brand: nextBrand,
      model: nextModel,
      year: nextYear,
    });
  }

  function handleModelChange(nextModel: string) {
    const currentYearText = String(currentYear);
    commitFilters({
      ...activeFilters,
      model: nextModel,
      year: nextModel ? currentYearText : "",
    });
  }

  function handleYearChange(nextYear: string) {
    const currentYearText = String(currentYear);
    const sanitizedYear = nextYear && nextYear !== currentYearText ? currentYearText : nextYear;

    commitFilters({
      ...activeFilters,
      year: sanitizedYear,
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(activeFilters);
    }
  }

  return (
    <section className="research-band" aria-label="Explore new cars">
      <PageContainer>
        <h2>Explore New Cars in Pakistan</h2>

        <div className="research-search-card">
          <p>Research by Make</p>
          <form className="research-form" onSubmit={handleSubmit}>
            <label>
              <span className="visually-hidden">Select Make</span>
              <select value={activeFilters.brand} onChange={(event) => handleMakeChange(event.target.value)}>
                <option value="" disabled>
                  Select Make
                </option>
                {makeOptions.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="visually-hidden">Select Model</span>
              <select value={activeFilters.model} onChange={(event) => handleModelChange(event.target.value)}>
                <option value="" disabled>
                  Select Model
                </option>
                {modelOptions.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="visually-hidden">Select Year</span>
              <select value={activeFilters.year} onChange={(event) => handleYearChange(event.target.value)}>
                <option value="" disabled>
                  Select Year
                </option>
                <option value={String(currentYear)}>{currentYear}</option>
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
