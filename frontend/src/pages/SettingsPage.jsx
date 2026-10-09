function SettingsPage() {
  return (
    <div className="settings-page">
      <div className="page-header">
        <div className="page-header-text">
          <h1 className="page-title">Configuration & Settings</h1>
          <p className="page-subtitle">
            Environment definitions, proxy bindings, and application parameters
          </p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">Environment Variables & Networking</h2>
          </div>
          <div className="dashboard-card-body">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div className="form-group">
                <label className="form-label">Deployment Environment</label>
                <input
                  type="text"
                  className="form-input"
                  value="Local Development (Docker Compose)"
                  readOnly
                  disabled
                />
                <span className="form-hint">Host Port 5001 (Nginx Web Entrypoint)</span>
              </div>

              <div className="form-group">
                <label className="form-label">Backend API URL</label>
                <input
                  type="text"
                  className="form-input"
                  value="Same-Origin Relative (/api)"
                  readOnly
                  disabled
                />
                <span className="form-hint">Forwarded by Nginx to http://backend:3000</span>
              </div>

              <div className="form-group">
                <label className="form-label">Database Connection Host</label>
                <input
                  type="text"
                  className="form-input"
                  value="postgres-db (Port 5432)"
                  readOnly
                  disabled
                />
                <span className="form-hint">Docker Network Internal DNS</span>
              </div>

              <div className="form-group">
                <label className="form-label">Database Name</label>
                <input
                  type="text"
                  className="form-input"
                  value="cloudapp"
                  readOnly
                  disabled
                />
                <span className="form-hint">Schema initialized with 01-schema.sql</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">Version & Stack Information</h2>
          </div>
          <div className="dashboard-card-body">
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", fontSize: "13px" }}>
              <div><strong>Frontend:</strong> React 19.2 + Vite 8.0</div>
              <div><strong>Router:</strong> React Router DOM 7.15</div>
              <div><strong>Client:</strong> Axios 1.16</div>
              <div><strong>Backend:</strong> Express 5.2 + pg 8.21</div>
              <div><strong>Database:</strong> PostgreSQL 16 Alpine</div>
              <div><strong>Proxy:</strong> Nginx 1.25 Alpine</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
