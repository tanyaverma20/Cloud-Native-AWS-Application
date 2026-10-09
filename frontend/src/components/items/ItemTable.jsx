import { useState } from "react";
import { SearchIcon, PlusIcon, RefreshIcon, ItemsIcon } from "../icons";

function ItemTable({
  items,
  loading,
  error,
  onOpenCreate,
  onRefresh,
  refreshing,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchesName = item.name?.toLowerCase().includes(q);
    const matchesId = String(item.id).toLowerCase().includes(q);
    return matchesName || matchesId;
  });

  return (
    <div className="dashboard-card">
      <div className="table-toolbar">
        <div className="table-search-group">
          <SearchIcon className="table-search-icon" size={15} />
          <input
            type="text"
            className="table-search-input"
            placeholder="Search records by ID or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Filter items"
          />
        </div>

        <div className="table-actions">
          <button
            className="btn btn-secondary btn-sm"
            onClick={onRefresh}
            disabled={refreshing || loading}
            title="Refresh database records"
          >
            <RefreshIcon size={14} className={refreshing ? "spinner" : ""} />
            <span>Refresh</span>
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={onOpenCreate}
            id="create-item-button"
          >
            <PlusIcon size={14} />
            <span>Create Item</span>
          </button>
        </div>
      </div>

      <div className="table-responsive-container">
        {loading ? (
          <div className="state-container">
            <span className="spinner spinner-lg" />
            <p className="state-title">Loading items from PostgreSQL...</p>
            <p className="state-description">Querying cloudapp.items table via backend API</p>
          </div>
        ) : error ? (
          <div className="state-container">
            <div className="state-icon-box" style={{ color: "var(--danger-text)" }}>
              <ItemsIcon size={24} />
            </div>
            <p className="state-title" style={{ color: "var(--danger-text)" }}>{error}</p>
            <p className="state-description">
              Could not retrieve items from the backend service. Ensure PostgreSQL and Express are operational.
            </p>
            <button className="btn btn-secondary btn-sm" onClick={onRefresh}>
              Retry Query
            </button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="state-container">
            <div className="state-icon-box">
              <ItemsIcon size={24} />
            </div>
            <p className="state-title">
              {searchQuery ? "No matching items found" : "No items in database"}
            </p>
            <p className="state-description">
              {searchQuery
                ? `No records match "${searchQuery}". Clear your search query to see all items.`
                : "Create your first database item to get started."}
            </p>
            {searchQuery ? (
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </button>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={onOpenCreate}>
                <PlusIcon size={14} />
                <span>Create Item</span>
              </button>
            )}
          </div>
        ) : (
          <table className="data-table" aria-label="Items List">
            <thead>
              <tr>
                <th style={{ width: "110px" }}>ID</th>
                <th>Item Name</th>
                <th style={{ width: "160px" }}>Storage Engine</th>
                <th style={{ width: "120px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="item-row">
                  <td>
                    <span className="item-id-badge">#{item.id}</span>
                  </td>
                  <td>
                    <div className="item-name-cell">
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="storage-pill">
                      PostgreSQL 16
                    </span>
                  </td>
                  <td>
                    <span className="status-pill success">
                      <span className="status-pill-dot" />
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="table-footer">
        <span>
          Showing <strong>{filteredItems.length}</strong> of <strong>{items.length}</strong> {items.length === 1 ? "item" : "items"}
        </span>
        <span className="service-detail">Table: cloudapp.public.items</span>
      </div>
    </div>
  );
}

export default ItemTable;
