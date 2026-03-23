# Carlogue Frontend Template

Static React + TypeScript frontend implementing the multi-page editorial template from your PDF/spec.

## Pages implemented

- `/` Home
- `/shop-new-cars`
- `/expert-reviews`
- `/news-stories`
- `/whats-my-car-worth` (intentionally blank placeholder)

## Reusable components

- `TopStrip`
- `MainNav`
- `PageContainer`
- `SectionHeader`
- `StoryCard`
- `FeatureStory`
- `SidebarStoryList`
- `ResearchSearchPanel`
- `CategoryTile`
- `FooterBand`

## Run locally

1. Install dependencies:
   - `npm install`
2. Start dev server:
   - `npm run dev`
3. Build production bundle:
   - `npm run build`
4. Preview production build:
   - `npm run preview`

## Content and image placeholders

All sections are wired with placeholder data in:

- `src/data/siteData.ts`

To replace placeholders with real assets, update the `image` paths in that file and add files under `public/images/...`.
