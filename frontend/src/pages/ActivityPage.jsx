import { CheckCircleIcon, PlusIcon, RefreshIcon } from "../components/icons";

function ActivityPage({ activities = [] }) {
  const defaultActivities = [
    {
      id: "act-1",
      type: "probe",
      title: "Health Check Probe Succeeded",
      description: "PostgreSQL SELECT 1 responded with status OK.",
      timestamp: "Just now",
    },
    {
      id: "act-2",
      type: "fetch",
      title: "Synchronized Item Collection",
      description: "Retrieved items from table cloudapp.public.items via GET /api/items/getitems.",
      timestamp: "1 min ago",
    },
    {
      id: "act-3",
      type: "init",
      title: "Docker Compose Stack Started",
      description: "Initialized postgres-db (16-alpine), backend (Express 5), and frontend (Nginx 1.25).",
      timestamp: "5 mins ago",
    },
  ];

  const displayActivities = activities.length > 0 ? activities : defaultActivities;

  return (
    <div className="activity-page">
      <div className="page-header">
        <div className="page-header-text">
          <h1 className="page-title">Activity Feed</h1>
          <p className="page-subtitle">
            Audit log of database operations, item modifications, and system health checks
          </p>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <h2 className="dashboard-card-title">Event Log</h2>
          <span className="status-pill neutral">Live Session</span>
        </div>
        <div className="dashboard-card-body" style={{ padding: "8px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {displayActivities.map((act, idx) => (
              <div
                key={act.id || idx}
                style={{
                  display: "flex",
                  gap: "16px",
                  padding: "16px 0",
                  borderBottom: idx < displayActivities.length - 1 ? "1px solid var(--border-color)" : "none",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: act.type === "create" ? "var(--primary-light)" : "var(--success-bg)",
                    color: act.type === "create" ? "var(--primary-blue)" : "var(--success-text)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {act.type === "create" ? (
                    <PlusIcon size={14} />
                  ) : act.type === "fetch" ? (
                    <RefreshIcon size={14} />
                  ) : (
                    <CheckCircleIcon size={14} />
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{act.title}</span>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{act.timestamp}</span>
                  </div>
                  <span style={{ fontSize: "12.5px", color: "var(--text-secondary)" }}>{act.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityPage;
