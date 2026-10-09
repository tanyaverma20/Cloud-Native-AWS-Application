import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children, healthStatus, itemCount, onRefresh, refreshing }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        healthStatus={healthStatus}
        itemCount={itemCount}
      />

      <div className={`app-main ${collapsed ? "sidebar-collapsed" : ""}`}>
        <Header
          onToggleMobile={() => setMobileOpen(!mobileOpen)}
          onRefresh={onRefresh}
          refreshing={refreshing}
          healthStatus={healthStatus}
        />

        <main className="page-content" id="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
