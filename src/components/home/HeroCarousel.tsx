import { useEffect, useMemo, useState } from "react";
import type { Article } from "../../types";
import { ResponsiveImage } from "../common/ResponsiveImage";

type HeroCarouselProps = {
  slides: Article[];
};

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const safeSlides = useMemo(() => (slides.length ? slides : [{ id: "fallback", title: "No slides available" }]), [slides]);
  const activeSlide = safeSlides[activeIndex] ?? safeSlides[0];

  useEffect(() => {
    if (safeSlides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((previousIndex) => (previousIndex + 1) % safeSlides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [safeSlides.length]);

  function goToSlide(nextIndex: number) {
    const normalized = (nextIndex + safeSlides.length) % safeSlides.length;
    setActiveIndex(normalized);
  }

  return (
    <section className="hero-carousel" aria-label="Latest news">
      <button type="button" className="hero-arrow" onClick={() => goToSlide(activeIndex - 1)} aria-label="Previous slide">
        {"<"}
      </button>

      <div className="hero-body">
        <ResponsiveImage src={activeSlide.image} alt={activeSlide.title} ratio="16 / 9" className="hero-image" placeholderLabel="Latest News" />

        <div className="hero-copy">
          {activeSlide.category ? <p className="eyebrow is-news">{activeSlide.category}</p> : null}
          <h1>{activeSlide.title}</h1>
          {activeSlide.excerpt ? <p>{activeSlide.excerpt}</p> : null}
        </div>

        {safeSlides.length > 1 ? (
          <div className="hero-dots" aria-label="Slide indicators">
            {safeSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={index === activeIndex ? "is-active" : ""}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        ) : null}
      </div>

      <button type="button" className="hero-arrow" onClick={() => goToSlide(activeIndex + 1)} aria-label="Next slide">
        {">"}
      </button>
    </section>
  );
}
