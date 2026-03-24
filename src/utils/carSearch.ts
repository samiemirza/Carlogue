import type { Article } from "../types";

export type CarSearchFilters = {
  brand: string;
  model: string;
  year: string;
};

export const EMPTY_CAR_SEARCH_FILTERS: CarSearchFilters = {
  brand: "",
  model: "",
  year: "",
};

export function normalizeCarSearchValue(value: string): string {
  return value.trim().toLowerCase().replace(/[\s_-]+/g, " ");
}

export function getArticleYear(article: Article): number | null {
  if (typeof article.year === "number" && Number.isFinite(article.year)) {
    return Math.round(article.year);
  }

  const match = article.title.match(/\b(19|20)\d{2}\b/);
  return match ? Number(match[0]) : null;
}

export function getArticleBrand(article: Article): string {
  if (article.brand && article.brand.trim().length) {
    return article.brand.trim();
  }

  const tokens = article.title.trim().split(/\s+/).filter(Boolean);
  if (!tokens.length) {
    return "";
  }

  if (/^\d{4}$/.test(tokens[0]) && tokens[1]) {
    return tokens[1];
  }

  return tokens[0];
}

export function getArticleModel(article: Article): string {
  if (article.model && article.model.trim().length) {
    return article.model.trim();
  }

  const tokens = article.title.trim().split(/\s+/).filter(Boolean);
  if (!tokens.length) {
    return "";
  }

  let start = 0;
  if (/^\d{4}$/.test(tokens[start])) {
    start += 1;
  }

  const derivedBrand = getArticleBrand(article);
  if (tokens[start] && normalizeCarSearchValue(tokens[start]) === normalizeCarSearchValue(derivedBrand)) {
    start += 1;
  }

  return tokens.slice(start).join(" ").trim();
}

export function matchesCarSearch(article: Article, filters: CarSearchFilters): boolean {
  if (filters.brand) {
    if (normalizeCarSearchValue(getArticleBrand(article)) !== normalizeCarSearchValue(filters.brand)) {
      return false;
    }
  }

  if (filters.model) {
    if (normalizeCarSearchValue(getArticleModel(article)) !== normalizeCarSearchValue(filters.model)) {
      return false;
    }
  }

  if (filters.year) {
    const year = getArticleYear(article);
    if (!year || String(year) !== filters.year) {
      return false;
    }
  }

  return true;
}

export function findCarForSearch(cars: Article[], filters: CarSearchFilters): Article | null {
  if (!filters.model) {
    return null;
  }

  const normalizedModel = normalizeCarSearchValue(filters.model);
  const normalizedBrand = filters.brand ? normalizeCarSearchValue(filters.brand) : "";

  let candidates = cars.filter((article) => normalizeCarSearchValue(getArticleModel(article)) === normalizedModel);
  if (!candidates.length) {
    return null;
  }

  if (normalizedBrand) {
    const brandScopedCandidates = candidates.filter((article) => normalizeCarSearchValue(getArticleBrand(article)) === normalizedBrand);
    if (brandScopedCandidates.length) {
      candidates = brandScopedCandidates;
    }
  }

  if (filters.year) {
    const yearScopedCandidates = candidates.filter((article) => {
      const year = getArticleYear(article);
      return year && String(year) === filters.year;
    });
    if (yearScopedCandidates.length) {
      candidates = yearScopedCandidates;
    }
  }

  return candidates[0] ?? null;
}

export function buildBrandRoute(brand: string): string {
  return `/brands/${encodeURIComponent(brand.trim())}`;
}
