export type NavItem = {
  label: string;
  path: string;
};

export type Article = {
  id: string;
  title: string;
  category?: string;
  brand?: string;
  model?: string;
  year?: number;
  publishedAt?: string;
  rating?: number;
  startingPriceLacs?: number;
  gallery?: string[];
  excerpt?: string;
  image?: string;
  href?: string;
  traction?: number;
};

export type CategoryTileData = {
  id: string;
  title: string;
  image?: string;
};
