import { ItemsIcon, DatabaseIcon, ServerIcon } from "../icons";

function SummaryCards({ itemCount, healthData, loadingHealth }) {
  const isDbHealthy = healthData?.status === "OK";
  const isApiHealthy = healthData?.available === true;

  const getDbStatusLabel = () => {
    if (loadingHealth) return "Checking...";
    if (isDbHealthy) return "Healthy";
    if (healthData?.status === "UNAVAILABLE") return "Unavailable";
    return "Disconnected";
  };

  const getApiStatusLabel = () => {
    if (loadingHealth) return "Checking...";
    if (isApiHealthy) return "Operational";
    return "Unreachable";
  };

  const formatUptime = (seconds) => {
    if (!seconds && seconds !== 0) return null;
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    if (mins > 60) {
      const hrs = Math.floor(mins / 60);
      return `${hrs}h ${mins % 60}m`;
    }
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="summary-cards-grid">
      {/* Total Items Card */}
      <div className="summary-card">
        <div className="summary-card-header">
          <span className="summary-card-label">Total Items</span>
          <div className="summary-card-icon-box blue">
            <ItemsIcon size={17} />
          </div>
        </div>
        <div className="summary-card-value">
          {itemCount !== null ? itemCount : "—"}
        </div>
        <div className="summary-card-subtext">
          <span className="storage-pill">PostgreSQL public.items</span>
        </div>
      </div>

      {/* Database Status Card */}
      <div className="summary-card">
        <div className="summary-card-header">
          <span className="summary-card-label">Database Status</span>
          <div className="summary-card-icon-box green">
            <DatabaseIcon size={17} />
          </div>
        </div>
        <div className="summary-card-value">
          <span className={`status-pill ${isDbHealthy ? "success" : "danger"}`}>
            <span className="status-pill-dot" />
            {getDbStatusLabel()}
          </span>
        </div>
        <div className="summary-card-subtext">
          <span>PostgreSQL 16 Alpine (:5432)</span>
        </div>
      </div>

      {/* API Status Card */}
      <div className="summary-card">
        <div className="summary-card-header">
          <span className="summary-card-label">API Status</span>
          <div className="summary-card-icon-box purple">
            <ServerIcon size={17} />
          </div>
        </div>
        <div className="summary-card-value">
          <span className={`status-pill ${isApiHealthy ? "success" : "danger"}`}>
            <span className="status-pill-dot" />
            {getApiStatusLabel()}
          </span>
        </div>
        <div className="summary-card-subtext">
          <span>
            {healthData?.data?.uptime ? `Uptime: ${formatUptime(healthData.data.uptime)}` : "Express 5 Backend (:3000)"}
          </span>
        </div>
      </div>

      {/* Environment Card */}
      <div className="summary-card">
        <div className="summary-card-header">
          <span className="summary-card-label">Environment</span>
          <div className="summary-card-icon-box yellow">
            <span style={{ fontSize: "11px", fontWeight: 700, fontFamily: "var(--font-mono)" }}>ENV</span>
          </div>
        </div>
        <div className="summary-card-value">
          <span className="status-pill neutral">
            <span className="status-pill-dot" />
            Local Development
          </span>
        </div>
        <div className="summary-card-subtext">
          <span>Docker Compose (Nginx :5001)</span>
        </div>
      </div>
    </div>
  );
}

export default SummaryCards;
