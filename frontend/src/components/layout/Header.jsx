import { useLocation } from "react-router-dom";
import {
  MenuIcon,
  SearchIcon,
  BellIcon,
  RefreshIcon,
} from "../icons";

function Header({ onToggleMobile, onRefresh, refreshing, healthStatus }) {
  const location = useLocation();
  const isHealthy = healthStatus?.status === "OK";

  const getBreadcrumbName = () => {
    switch (location.pathname) {
      case "/":
        return "Overview";
      case "/items":
        return "Items Management";
      case "/infrastructure":
        return "Infrastructure";
      case "/activity":
        return "Activity Feed";
      case "/settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="top-navbar">
      <div className="navbar-left">
        <button
          className="mobile-menu-button"
          onClick={onToggleMobile}
          aria-label="Toggle mobile menu"
        >
          <MenuIcon size={18} />
        </button>

        <nav aria-label="Breadcrumb" className="navbar-breadcrumbs">
          <span className="breadcrumb-root">CloudOps</span>
          <span className="breadcrumb-separator" aria-hidden="true">›</span>
          <span className="breadcrumb-active" aria-current="page">{getBreadcrumbName()}</span>
        </nav>
      </div>

      <div className="navbar-right">
        {/* Real-time telemetry health indicator */}
        <div className="navbar-telemetry-badge" title="Core container services status">
          <span className={`pulse-dot ${isHealthy ? "" : "offline"}`} style={{
            backgroundColor: isHealthy ? "var(--success-dot)" : "var(--danger-dot)"
          }} />
          <span>{isHealthy ? "Operational" : "Degraded"}</span>
        </div>

        {/* Global Search with strict icon sizing */}
        <div className="navbar-search-wrapper">
          <SearchIcon className="navbar-search-icon" size={15} />
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search resources... (⌘K)"
            aria-label="Search resources"
          />
          <span className="search-shortcut-badge" aria-hidden="true">⌘K</span>
        </div>

        {/* Action: Refresh Data */}
        <button
          className={`navbar-action-btn ${refreshing ? "active-refresh" : ""}`}
          onClick={onRefresh}
          title="Refresh items & system telemetry"
          aria-label="Refresh data"
          disabled={refreshing}
        >
          <RefreshIcon size={15} />
        </button>

        {/* Action: Notifications */}
        <button
          className="navbar-action-btn"
          title="System notifications"
          aria-label="System notifications"
        >
          <BellIcon size={15} />
          <span className="notification-badge-dot" />
        </button>

        {/* Profile Pill */}
        <div className="navbar-user-profile" tabIndex={0} role="button" aria-label="Account menu">
          <div className="user-avatar">CO</div>
          <div className="user-info">
            <span className="user-name">Admin</span>
            <span className="user-role">DevOps</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
