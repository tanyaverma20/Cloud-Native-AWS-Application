import ItemTable from "../components/items/ItemTable";
import AlertBanner from "../components/common/AlertBanner";

function ItemsPage({
  items,
  loading,
  error,
  notification,
  onClearNotification,
  onOpenCreate,
  onRefresh,
  refreshing,
}) {
  return (
    <div className="items-page">
      <div className="page-header">
        <div className="page-header-text">
          <h1 className="page-title">Items Management</h1>
          <p className="page-subtitle">
            Query and register resource items stored in the PostgreSQL database
          </p>
        </div>
      </div>

      {notification && (
        <AlertBanner
          type={notification.type}
          message={notification.message}
          onClose={onClearNotification}
        />
      )}

      <ItemTable
        items={items}
        loading={loading}
        error={error}
        onOpenCreate={onOpenCreate}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </div>
  );
}

export default ItemsPage;
