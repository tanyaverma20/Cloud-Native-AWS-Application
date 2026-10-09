import { DatabaseIcon, ServerIcon, CheckCircleIcon } from "../components/icons";

function InfrastructurePage({ healthData }) {
  const isHealthy = healthData?.status === "OK";

  return (
    <div className="infrastructure-page">
      <div className="page-header">
        <div className="page-header-text">
          <h1 className="page-title">Infrastructure Topology</h1>
          <p className="page-subtitle">
            Container specifications, network configurations, and storage volumes
          </p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">Docker Compose Service Map</h2>
            <span className="status-pill neutral">Local Bridge: app-network</span>
          </div>
          <div className="dashboard-card-body">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
              {/* PostgreSQL Box */}
              <div style={{ padding: "16px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", background: "var(--bg-canvas)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div className="summary-card-icon-box green">
                    <DatabaseIcon size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>postgres-db</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Database Service</div>
                  </div>
                </div>
                <div style={{ fontSize: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div><strong>Image:</strong> <code>postgres:16-alpine</code></div>
                  <div><strong>Container Port:</strong> <code>5432</code></div>
                  <div><strong>Volume:</strong> <code>postgres_data:/var/lib/postgresql/data</code></div>
                  <div><strong>Database Name:</strong> <code>cloudapp</code></div>
                  <div><strong>Table:</strong> <code>public.items</code></div>
                  <div style={{ marginTop: "6px" }}>
                    <span className={`status-pill ${isHealthy ? "success" : "danger"}`}>
                      <span className="status-pill-dot" />
                      {isHealthy ? "Healthy (pg_isready)" : "Unavailable"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Backend Express Box */}
              <div style={{ padding: "16px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", background: "var(--bg-canvas)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div className="summary-card-icon-box blue">
                    <ServerIcon size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>backend</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>REST API Service</div>
                  </div>
                </div>
                <div style={{ fontSize: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div><strong>Runtime:</strong> <code>Node.js 20 / Express 5</code></div>
                  <div><strong>Binding:</strong> <code>0.0.0.0:3000</code></div>
                  <div><strong>Database Host:</strong> <code>postgres-db:5432</code></div>
                  <div><strong>Security:</strong> <code>Helmet + CORS Middleware</code></div>
                  <div><strong>Health Route:</strong> <code>GET /health</code></div>
                  <div style={{ marginTop: "6px" }}>
                    <span className={`status-pill ${healthData?.available ? "success" : "danger"}`}>
                      <span className="status-pill-dot" />
                      {healthData?.available ? "Online" : "Down"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Frontend Nginx Box */}
              <div style={{ padding: "16px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", background: "var(--bg-canvas)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div className="summary-card-icon-box purple">
                    <ServerIcon size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>frontend</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Web / Reverse Proxy</div>
                  </div>
                </div>
                <div style={{ fontSize: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div><strong>Server:</strong> <code>Nginx 1.25 Alpine</code></div>
                  <div><strong>Host Mapping:</strong> <code>5001:80</code></div>
                  <div><strong>Framework:</strong> <code>React 19 + Vite</code></div>
                  <div><strong>Proxy Route:</strong> <code>/api/* -&gt; backend:3000</code></div>
                  <div><strong>Proxy Route:</strong> <code>/health -&gt; backend:3000/health</code></div>
                  <div style={{ marginTop: "6px" }}>
                    <span className="status-pill success">
                      <span className="status-pill-dot" />
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">Network Architecture Details</h2>
          </div>
          <div className="dashboard-card-body">
            <p style={{ marginBottom: "14px", color: "var(--text-secondary)" }}>
              The application utilizes a secure Docker bridge network (<code>app-network</code>) to isolate intra-service communication:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12.5px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircleIcon size={14} style={{ color: "var(--success-text)" }} />
                <span><strong>Same-Origin Proxy:</strong> Browser communicates strictly with <code>http://localhost:5001</code> to avoid CORS pitfalls.</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircleIcon size={14} style={{ color: "var(--success-text)" }} />
                <span><strong>Internal Container DNS:</strong> Nginx routes <code>/api</code> and <code>/health</code> directly to <code>http://backend:3000</code>.</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircleIcon size={14} style={{ color: "var(--success-text)" }} />
                <span><strong>Persistence:</strong> Named volume <code>postgres_data</code> mounts to <code>/var/lib/postgresql/data</code> ensuring item durability.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfrastructurePage;
