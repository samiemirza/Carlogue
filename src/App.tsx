import { useEffect, useState, type AnimationEvent } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { FooterBand } from "./components/layout/FooterBand";
import { MainNav } from "./components/layout/MainNav";
import { TopStrip } from "./components/layout/TopStrip";
import { CarWorthPage } from "./pages/CarWorthPage";
import { CarDetailsPage } from "./pages/CarDetailsPage";
import { ExpertReviewsPage } from "./pages/ExpertReviewsPage";
import { HomePage } from "./pages/HomePage";
import { NewsStoriesPage } from "./pages/NewsStoriesPage";
import { ShopNewCarsPage } from "./pages/ShopNewCarsPage";
import { StoriesPage } from "./pages/StoriesPage";

function ScrollToTopOnRouteChange() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const id = decodeURIComponent(location.hash.replace("#", ""));
    if (!id) {
      return;
    }

    let attempts = 0;
    const maxAttempts = 30;
    const timer = window.setInterval(() => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        window.clearInterval(timer);
        return;
      }

      attempts += 1;
      if (attempts >= maxAttempts) {
        window.clearInterval(timer);
      }
    }, 30);

    return () => window.clearInterval(timer);
  }, [location.hash, location.pathname]);

  return null;
}

export default function App() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<"fade-in" | "fade-out">("fade-in");

  useEffect(() => {
    const currentPath = `${location.pathname}${location.search}${location.hash}`;
    const displayedPath = `${displayLocation.pathname}${displayLocation.search}${displayLocation.hash}`;
    if (currentPath !== displayedPath) {
      setTransitionStage("fade-out");
    }
  }, [location, displayLocation]);

  function handleRouteAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (transitionStage === "fade-out") {
      setDisplayLocation(location);
      setTransitionStage("fade-in");
    }
  }

  return (
    <div className="app-shell">
      <TopStrip />
      <MainNav />
      <ScrollToTopOnRouteChange />

      <main>
        <div className={`route-fade-wrap ${transitionStage}`} onAnimationEnd={handleRouteAnimationEnd}>
          <Routes location={displayLocation}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop-new-cars" element={<ShopNewCarsPage />} />
            <Route path="/brands/:brand" element={<ShopNewCarsPage />} />
            <Route path="/expert-reviews" element={<ExpertReviewsPage />} />
            <Route path="/news-stories" element={<NewsStoriesPage />} />
            <Route path="/news-stories/stories" element={<StoriesPage />} />
            <Route path="/cars/:carId" element={<CarDetailsPage />} />
            <Route path="/whats-my-car-worth" element={<CarWorthPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      <FooterBand />
    </div>
  );
}
