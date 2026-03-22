# Cars R Us - Homepage Reference Spec

This spec is built from the uploaded PDF mockup and is meant to be the **source of truth** for the homepage and the shared design language for all other pages.

## 1) Overall visual direction

The reference has a very editorial automotive-magazine structure:

- a thin deep-blue top strip
- a compact centered navigation bar
- a single large hero story block
- a full-width teal research band
- stacked editorial sections on a very light gray canvas
- a heavy deep-blue footer band

The layout language should stay **minimal, flat, and precise**. No glassmorphism, no gradients, no AI-style glow effects, no oversized shadows.

## 2) Core colors pulled from the reference

These are the closest usable tokens from the PDF:

```css
--color-page: #FCFCFC;
--color-surface: #FFFFFF;
--color-text: #111111;
--color-text-soft: #5F6368;
--color-border: #D9D9D9;
--color-teal: #3095B4;      /* research band + active accents */
--color-footer: #025172;    /* top strip + footer band */
--color-news: #0A9A4B;      /* small NEWS label */
```

## 3) Font adjustments

The mockup structure is strong, but the typography should be upgraded.

### Recommended font pairing

Use this combination:

- **Headings / display / nav emphasis:** `Inter Tight`, fallback to `SF Pro Display`, `Inter`, `system-ui`, `sans-serif`
- **Body / captions / metadata:** `Inter`, fallback to `SF Pro Text`, `system-ui`, `sans-serif`

### Type scale

#### Desktop
- Hero headline: `48px / 0.98 / 800 / -0.04em`
- Large section heading: `34px / 1.02 / 800 / -0.03em`
- Standard section heading: `22px / 1.05 / 800 / -0.02em`
- Featured headline: `18px / 1.1 / 800 / -0.02em`
- Card title: `14px / 1.2 / 700`
- Nav label: `11px / 1 / 700 / 0.04em` uppercase
- Eyebrow label: `11px / 1 / 800 / 0.08em` uppercase
- Body: `15px / 1.6 / 400`
- Meta / tiny helper text: `12px / 1.35 / 500`

#### Tablet
- Hero headline: `40px`
- Large section heading: `30px`
- Standard section heading: `20px`

#### Mobile
- Hero headline: `28px`
- Large section heading: `24px`
- Standard section heading: `18px`
- Card title: `13px`

## 4) Layout geometry

Build the page around a fixed desktop content system.

### Global shell
- Page background: `#FCFCFC`
- Desktop content width: `1120px max`
- Side padding: `24px` on desktop, `20px` tablet, `16px` mobile
- Top strip height: `12px`
- Nav height: `56px`
- Default vertical section rhythm: `80px`

### Hero area
- Hero wrapper max width: `920px`
- Hero image ratio: `16:9`
- Hero image radius: `18px`
- Gap below image to text: `16px`
- Story headline width: same as image width, left aligned
- Arrow controls: vertically centered, outside the hero image block

### Research band
- Full-width teal band
- Vertical padding: `64px`
- Section title centered
- Search card max width: `920px`
- Search card height: auto with `24px` padding
- Search fields: 4-across desktop, stacked on mobile
- Category grid: `4 x 3` on desktop, gap `18px`
- Tile radius: `10px`

### Editorial sections
- Section container width: `1120px`
- Section heading bottom gap: `28px`
- Standard 4-card row
- Card image ratio: `4:3`
- Card title top gap: `10px`

### Featured section
- Two-column editorial split:
  - left feature block: `~68%`
  - right stacked list: `~32%`
- Large feature should feel visually heavier than the sidebar

### Buyer's guide
- One large lead image/card
- Large headline directly beneath
- Followed by a 4-card row

### Footer
- Solid deep-blue band
- Minimum height: `280px`

## 5) Reusable components that should define all pages

These should become the base artifacts reused everywhere:

1. `TopStrip`
2. `MainNav`
3. `PageContainer`
4. `SectionHeader`
5. `StoryCard`
6. `FeatureStory`
7. `SidebarStoryList`
8. `ResearchSearchPanel`
9. `CategoryTile`
10. `FooterBand`

## 6) Shared rules for Reviews and News pages

The PDF shows the Reviews and News pages reusing the same visual DNA:

- same top strip and nav
- same very light page background
- same centered content width
- same bold editorial headlines
- same simple section dividers
- same footer band

So for the other pages, do **not** invent a second design system.

Only vary:
- page heading
- section order
- hero format
- supporting story grouping

Keep constant:
- colors
- nav treatment
- page width
- card styles
- spacing rhythm
- footer

## 7) Implementation rules

- Keep all cards flat white or image-first. Avoid tinted cards unless the reference explicitly uses them.
- Use border-only inputs and buttons in the search band.
- Keep shadows extremely subtle or remove them entirely.
- Use rounded corners sparingly and consistently.
- Use strong alignment. Everything should lock to the same content grid.
- Do not over-center text. Most editorial text should stay left aligned.
- Do not compress spacing to fit more content.

## 8) Asset structure recommendation

```text
/public
  /images
    /home
      hero-kia-telluride.jpg
      latest-review-01.jpg
      latest-review-02.jpg
      latest-review-03.jpg
      latest-review-04.jpg
      featured-collage.jpg
      popular-01.jpg
      popular-02.jpg
      popular-03.jpg
      popular-04.jpg
      buyers-guide-hero.jpg
      buyers-guide-01.jpg
      buyers-guide-02.jpg
      buyers-guide-03.jpg
      buyers-guide-04.jpg
```

## 9) What to preserve exactly from the PDF

Preserve these almost one-to-one:

- the homepage section order
- the large hero followed by the teal research band
- the 4-up review rows
- the featured split layout
- the large buyer's guide block
- the deep blue footer strip

## 10) What is intentionally improved

These are the only deliberate upgrades from the reference:

- stronger typography hierarchy
- cleaner font pairing
- better responsive scaling
- cleaner spacing consistency
- more reusable component structure for code
