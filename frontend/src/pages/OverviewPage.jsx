import { Link } from "react-router-dom";
import SummaryCards from "../components/dashboard/SummaryCards";
import { PlusIcon, ItemsIcon, CheckCircleIcon, ExternalLinkIcon } from "../components/icons";

function OverviewPage({
  items,
  loading,
  healthData,
  loadingHealth,
  onOpenCreate,
}) {
  const isHealthy = healthData?.status === "OK";

  return (
    <div className="overview-page">
      <div className="page-header">
        <div className="page-header-text">
          <h1 className="page-title">Cloud Infrastructure Overview</h1>
          <p className="page-subtitle">
            Real-time telemetry and container topology across the application stack
          </p>
        </div>

        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={onOpenCreate}>
            <PlusIcon size={14} />
            <span>Create Item</span>
          </button>
        </div>
      </div>

      <SummaryCards
        itemCount={loading ? null : items.length}
        healthData={healthData}
        loadingHealth={loadingHealth}
      />

      <div className="dashboard-sections-grid">
        {/* Recent Items Preview Card */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">Recent Database Items</h2>
            <Link to="/items" className="btn btn-secondary btn-sm">
              <span>View All Items ({items.length})</span>
              <ExternalLinkIcon size={12} />
            </Link>
          </div>

          <div className="dashboard-card-body" style={{ padding: 0 }}>
            {loading ? (
              <div className="state-container">
                <span className="spinner spinner-lg" />
                <p className="state-title">Querying PostgreSQL...</p>
              </div>
            ) : items.length === 0 ? (
              <div className="state-container">
                <div className="state-icon-box">
                  <ItemsIcon size={22} />
                </div>
                <p className="state-title">No items found</p>
                <p className="state-description">
                  Create your first record using the Create Item button above.
                </p>
              </div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: "90px" }}>ID</th>
                    <th>Name</th>
                    <th style={{ width: "130px" }}>Storage</th>
                  </tr>
                </thead>
                <tbody>
                  {items.slice(-5).reverse().map((item) => (
                    <tr key={item.id}>
                      <td>
                        <span className="item-id-badge">#{item.id}</span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 600 }}>{item.name}</span>
                      </td>
                      <td>
                        <span className="storage-pill">PostgreSQL 16</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Services Status Card */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">Container Services</h2>
            <span className={`status-pill ${isHealthy ? "success" : "danger"}`}>
              <span className="status-pill-dot" />
              {isHealthy ? "Operational" : "Degraded"}
            </span>
          </div>

          <div className="dashboard-card-body">
            <div className="service-status-list">
              {/* PostgreSQL */}
              <div className="service-status-item">
                <div className="service-info">
                  <span className="service-name">postgres-db</span>
                  <span className="service-detail">postgres:16-alpine :5432</span>
                </div>
                <span className={`status-pill ${isHealthy ? "success" : "danger"}`}>
                  <span className="status-pill-dot" />
                  {isHealthy ? "Healthy" : "Down"}
                </span>
              </div>

              {/* Backend */}
              <div className="service-status-item">
                <div className="service-info">
                  <span className="service-name">backend</span>
                  <span className="service-detail">Node.js Express 5 :3000</span>
                </div>
                <span className={`status-pill ${healthData?.available ? "success" : "danger"}`}>
                  <span className="status-pill-dot" />
                  {healthData?.available ? "Online" : "Down"}
                </span>
              </div>

              {/* Frontend */}
              <div className="service-status-item">
                <div className="service-info">
                  <span className="service-name">frontend</span>
                  <span className="service-detail">Nginx 1.25 Alpine :5001</span>
                </div>
                <span className="status-pill success">
                  <span className="status-pill-dot" />
                  Online
                </span>
              </div>
            </div>

            <div style={{ marginTop: "16px", padding: "12px", background: "var(--bg-canvas)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", fontSize: "11.5px", color: "var(--text-muted)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px", color: "var(--text-primary)", fontWeight: 600 }}>
                <CheckCircleIcon size={14} style={{ color: "var(--success-text)" }} />
                <span>Docker Network: app-network</span>
              </div>
              Intra-container traffic routes via bridge DNS. Reverse proxy forwards browser requests from :5001 to backend:3000.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
