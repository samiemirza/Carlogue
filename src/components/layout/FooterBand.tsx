import { Link } from "react-router-dom";
import { PageContainer } from "./PageContainer";

export function FooterBand() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-band">
      <PageContainer>
        <div className="footer-main-grid">
          <div className="footer-brand-block">
            <img src="/images/alt_logo.svg" alt="Carlogue logo" className="footer-logo-image" loading="lazy" />
            <p className="footer-note">
              Independent automotive news, reviews, comparison tests, and buyer guidance for the Pakistan market.
            </p>
          </div>

          <nav className="footer-column" aria-label="Explore">
            <p className="footer-column-title">Explore</p>
            <Link to="/">Home</Link>
            <Link to="/shop-new-cars">Shop New Cars</Link>
            <Link to="/expert-reviews">Expert Reviews</Link>
            <Link to="/expert-reviews#first-drives">First Drives</Link>
            <Link to="/news-stories">News + Stories</Link>
          </nav>

          <nav className="footer-column" aria-label="Tools">
            <p className="footer-column-title">Tools</p>
            <Link to="/whats-my-car-worth">What's My Car Worth</Link>
            <Link to="/#buyers-guide">Buyer's Guide</Link>
            <Link to="/shop-new-cars#popular-cars">Popular Cars</Link>
            <Link to="/shop-new-cars">Future Cars</Link>
            <Link to="/expert-reviews">Latest Reviews</Link>
          </nav>

          <div className="footer-column" aria-label="Follow us">
            <p className="footer-column-title">Follow</p>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
              YouTube
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p className="footer-copyright">© {year} All rights reserved.</p>

          <div className="footer-legal-links" aria-label="Legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
