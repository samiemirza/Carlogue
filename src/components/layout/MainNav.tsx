import { NavLink } from "react-router-dom";
import { navItems } from "../../data/siteData";
import { PageContainer } from "./PageContainer";

export function MainNav() {
  return (
    <header className="main-nav-shell">
      <PageContainer>
        <div className="main-nav-row">
          <div className="main-nav-logo-space" aria-hidden="true" />

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
