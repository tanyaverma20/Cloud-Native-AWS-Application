import { NavLink } from "react-router-dom";
import {
  LogoIcon,
  OverviewIcon,
  ItemsIcon,
  InfrastructureIcon,
  ActivityIcon,
  SettingsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../icons";

function Sidebar({ collapsed, onToggle, mobileOpen, healthStatus, itemCount }) {
  const isHealthy = healthStatus?.status === "OK";

  const managementNav = [
    { name: "Overview", path: "/", icon: OverviewIcon },
    { name: "Items", path: "/items", icon: ItemsIcon, count: itemCount },
  ];

  const systemNav = [
    { name: "Infrastructure", path: "/infrastructure", icon: InfrastructureIcon },
    { name: "Activity", path: "/activity", icon: ActivityIcon },
    { name: "Settings", path: "/settings", icon: SettingsIcon },
  ];

  const renderLink = (item) => {
    const Icon = item.icon;
    return (
      <NavLink
        key={item.path}
        to={item.path}
        end={item.path === "/"}
        className={({ isActive }) => `sidebar-nav-link ${isActive ? "active" : ""}`}
        title={collapsed ? item.name : undefined}
      >
        <span className="sidebar-nav-icon">
          <Icon size={18} />
        </span>
        {!collapsed && (
          <>
            <span>{item.name}</span>
            {typeof item.count === "number" && (
              <span className="sidebar-nav-badge">{item.count}</span>
            )}
          </>
        )}
      </NavLink>
    );
  };

  return (
    <aside
      className={`app-sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}
      aria-label="Application navigation"
    >
      <div className="sidebar-header">
        <div className="sidebar-logo-group">
          <div className="sidebar-logo-icon" aria-hidden="true">
            <LogoIcon size={18} />
          </div>
          {!collapsed && (
            <>
              <span className="sidebar-brand-name">CloudOps</span>
              <span className="sidebar-env-badge">Local</span>
            </>
          )}
        </div>
        <button
          className="sidebar-collapse-toggle"
          onClick={onToggle}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRightIcon size={14} /> : <ChevronLeftIcon size={14} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {!collapsed && <div className="sidebar-section-title">Core Platform</div>}
        {managementNav.map(renderLink)}

        {!collapsed && <div className="sidebar-section-title" style={{ marginTop: "8px" }}>Observability & Setup</div>}
        {systemNav.map(renderLink)}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-status-pill">
          <span
            className={`sidebar-status-indicator ${isHealthy ? "online" : "offline"}`}
            title={isHealthy ? "Services Operational" : "Service Degraded"}
          />
          {!collapsed && (
            <div className="sidebar-status-meta">
              <span className="sidebar-status-label">
                {isHealthy ? "PostgreSQL & Express OK" : "Service Degraded"}
              </span>
              <span className="sidebar-status-sub">Local Docker Network</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
