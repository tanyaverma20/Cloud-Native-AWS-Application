import { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import OverviewPage from "./pages/OverviewPage";
import ItemsPage from "./pages/ItemsPage";
import InfrastructurePage from "./pages/InfrastructurePage";
import ActivityPage from "./pages/ActivityPage";
import SettingsPage from "./pages/SettingsPage";
import ItemFormModal from "./components/items/ItemFormModal";
import { getItems, createItem } from "./api/itemsApi";
import { getHealth } from "./api/healthApi";

function App() {
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [itemsError, setItemsError] = useState("");

  const [healthData, setHealthData] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(true);

  const [refreshing, setRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [notification, setNotification] = useState(null);
  const [activities, setActivities] = useState([]);

  const addActivity = useCallback((activity) => {
    setActivities((prev) => [
      {
        id: `act-${Date.now()}-${Math.random()}`,
        timestamp: "Just now",
        ...activity,
      },
      ...prev.slice(0, 19),
    ]);
  }, []);

  const fetchHealthData = useCallback(async () => {
    setLoadingHealth(true);
    try {
      const data = await getHealth();
      setHealthData(data);
    } catch {
      setHealthData({
        available: false,
        status: "UNAVAILABLE",
        message: "Failed to connect to health endpoint",
      });
    } finally {
      setLoadingHealth(false);
    }
  }, []);

  const fetchItemsData = useCallback(async () => {
    setLoadingItems(true);
    try {
      const data = await getItems();
      setItems(data || []);
      setItemsError("");
    } catch {
      setItemsError("Failed to fetch items from database.");
    } finally {
      setLoadingItems(false);
    }
  }, []);

  // Initial data loading with cleanup guard
  useEffect(() => {
    let active = true;

    async function loadInitial() {
      try {
        const [itemsResult, healthResult] = await Promise.allSettled([
          getItems(),
          getHealth(),
        ]);

        if (!active) return;

        if (itemsResult.status === "fulfilled") {
          setItems(itemsResult.value || []);
          setItemsError("");
        } else {
          setItemsError("Failed to fetch items from database.");
        }

        if (healthResult.status === "fulfilled") {
          setHealthData(healthResult.value);
        } else {
          setHealthData({
            available: false,
            status: "UNAVAILABLE",
            message: "Failed to connect to health endpoint",
          });
        }
      } finally {
        if (active) {
          setLoadingItems(false);
          setLoadingHealth(false);
        }
      }
    }

    loadInitial();

    return () => {
      active = false;
    };
  }, []);

  const handleRefreshAll = async () => {
    setRefreshing(true);
    try {
      await Promise.all([fetchItemsData(), fetchHealthData()]);
      addActivity({
        type: "fetch",
        title: "Telemetry Refreshed",
        description: "Successfully updated items and service health indicators.",
      });
    } finally {
      setRefreshing(false);
    }
  };

  const handleCreateItem = async ({ name }) => {
    setSubmitting(true);
    try {
      const newItem = await createItem({ name });
      setItems((prev) => [...prev, newItem]);
      setIsModalOpen(false);
      setNotification({
        type: "success",
        message: `Item "${newItem.name}" (#${newItem.id}) created successfully in PostgreSQL.`,
      });
      addActivity({
        type: "create",
        title: "Item Created",
        description: `Registered item #${newItem.id} ("${newItem.name}") in database.`,
      });
    } catch (err) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to create item. Check database connection.";
      setNotification({
        type: "error",
        message: errorMsg,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout
      healthStatus={healthData}
      itemCount={items.length}
      onRefresh={handleRefreshAll}
      refreshing={refreshing}
    >
      <Routes>
        <Route
          path="/"
          element={
            <OverviewPage
              items={items}
              loading={loadingItems}
              healthData={healthData}
              loadingHealth={loadingHealth}
              onOpenCreate={() => setIsModalOpen(true)}
            />
          }
        />
        <Route
          path="/items"
          element={
            <ItemsPage
              items={items}
              loading={loadingItems}
              error={itemsError}
              notification={notification}
              onClearNotification={() => setNotification(null)}
              onOpenCreate={() => setIsModalOpen(true)}
              onRefresh={fetchItemsData}
              refreshing={loadingItems}
            />
          }
        />
        <Route
          path="/infrastructure"
          element={<InfrastructurePage healthData={healthData} />}
        />
        <Route
          path="/activity"
          element={<ActivityPage activities={activities} />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ItemFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateItem}
        submitting={submitting}
      />
    </Layout>
  );
}

export default App;