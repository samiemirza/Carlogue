export type NavItem = {
  label: string;
  path: string;
};

export type Article = {
  id: string;
  title: string;
  category?: string;
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
