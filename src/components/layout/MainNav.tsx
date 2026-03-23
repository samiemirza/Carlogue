import { Link, NavLink } from "react-router-dom";
import { navItems } from "../../data/siteData";
import { PageContainer } from "./PageContainer";

export function MainNav() {
  return (
    <header className="main-nav-shell">
      <PageContainer>
        <div className="main-nav-row">
          <div className="main-nav-logo-space">
            <Link to="/" className="main-nav-logo-link" aria-label="Carlogue home">
              <img src="/images/og_logo.png" alt="Carlogue logo" className="main-nav-logo-image" />
            </Link>
          </div>

          <nav className="main-nav" aria-label="Primary">
            <NavLink to="/" className={({ isActive }) => `main-nav-link ${isActive ? "is-active" : ""}`.trim()}>
              Home
            </NavLink>

            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `main-nav-link ${isActive ? "is-active" : ""}`.trim()}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </PageContainer>
    </header>
  );
}
