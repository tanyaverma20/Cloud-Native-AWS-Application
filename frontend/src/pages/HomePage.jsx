import { useEffect, useState } from "react";
import { createItem, getItems } from "../api/itemsApi";
import ItemList from "../components/ItemList";
import ItemForm from "../components/ItemForm";

function HomePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadItems() {
      try {
        const data = await getItems();
        if (isMounted) {
          setItems(data);
        }
      } catch {
        if (isMounted) {
          setError("Failed to fetch items");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadItems();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddItem = async (item) => {
    try {
      const newItem = await createItem(item);

      setItems((prevItems) => [...prevItems, newItem]);
    } catch {
      setError("Failed to create item");
    }
  };

  if (loading) {
    return <p>Loading items...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Items Dashboard</h1>

      <ItemForm onAdd={handleAddItem} />
      <ItemList items={items} />
    </div>
  );
}

export default HomePage;
