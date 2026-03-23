import { useEffect, useMemo, useState } from "react";
import type { Article } from "../../types";
import { ResponsiveImage } from "../common/ResponsiveImage";

type HeroCarouselProps = {
  slides: Article[];
};

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const animationDurationMs = 660;

  const safeSlides = useMemo(() => (slides.length ? slides : [{ id: "fallback", title: "No slides available" }]), [slides]);
  const activeSlide = safeSlides[activeIndex] ?? safeSlides[0];
  const outgoingSlide = outgoingIndex !== null ? safeSlides[outgoingIndex] ?? safeSlides[0] : null;
  const isAnimating = outgoingIndex !== null;

  useEffect(() => {
    if (safeSlides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      goToSlide(activeIndex + 1, 1);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [activeIndex, safeSlides.length, outgoingIndex]);

  useEffect(() => {
    if (outgoingIndex === null) {
      return;
    }

    const timer = window.setTimeout(() => {
      setOutgoingIndex(null);
    }, animationDurationMs);

    return () => window.clearTimeout(timer);
  }, [outgoingIndex, animationDurationMs]);

  function goToSlide(nextIndex: number, directionHint?: 1 | -1) {
    if (!safeSlides.length || isAnimating) {
      return;
    }

    const normalized = (nextIndex + safeSlides.length) % safeSlides.length;
    if (normalized === activeIndex) {
      return;
    }

    const inferredDirection: 1 | -1 = normalized > activeIndex ? 1 : -1;
    setDirection(directionHint ?? inferredDirection);
    setOutgoingIndex(activeIndex);
    setActiveIndex(normalized);
  }

  function renderSlide(slide: Article, className: string) {
    return (
      <div className={className}>
        <ResponsiveImage src={slide.image} alt={slide.title} ratio="16 / 9" className="hero-image" placeholderLabel="Latest News" />

        <div className="hero-copy">
          {slide.category ? <p className="eyebrow is-news">{slide.category}</p> : null}
          <h1>{slide.title}</h1>
          {slide.excerpt ? <p>{slide.excerpt}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <section className="hero-carousel" aria-label="Latest news">
      <button type="button" className="hero-arrow" onClick={() => goToSlide(activeIndex - 1, -1)} aria-label="Previous slide">
        {"‹"}
      </button>

      <div className="hero-body">
        <div className={`hero-stage ${isAnimating ? "is-animating" : ""}`.trim()}>
          {outgoingSlide ? (
            renderSlide(
              outgoingSlide,
              `hero-slide is-out ${direction === 1 ? "to-left" : "to-right"}`.trim(),
            )
          ) : null}
          {renderSlide(activeSlide, `hero-slide ${outgoingSlide ? `is-in ${direction === 1 ? "from-right" : "from-left"}` : "is-current"}`.trim())}
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

      <button type="button" className="hero-arrow" onClick={() => goToSlide(activeIndex + 1, 1)} aria-label="Next slide">
        {"›"}
      </button>
    </section>
  );
}
