import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { apiRequest } from "@/lib/api";

// Builds a context + provider that loads a user's records from `endpoint`
// once they are signed in and exposes create/update/delete helpers.
export default function createResourceContext(endpoint) {
  const ResourceContext = createContext(null);

  function ResourceProvider({ children }) {
    const { status } = useSession();
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const reload = useCallback(async () => {
      setIsLoading(true);
      try {
        setItems(await apiRequest(endpoint));
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }, []);

    useEffect(() => {
      if (status === "authenticated") reload();
      if (status === "unauthenticated") {
        setItems([]);
        setIsLoading(false);
      }
    }, [status, reload]);

    const create = async (values) => {
      const created = await apiRequest(endpoint, { method: "POST", body: values });
      setItems((prev) => [...prev, created]);
      return created;
    };

    const update = async (id, values) => {
      const previous = items;
      // Optimistic so checkboxes feel instant; rolled back if the request fails.
      setItems((prev) => prev.map((item) => (item._id === id ? { ...item, ...values } : item)));
      try {
        const updated = await apiRequest(`${endpoint}/${id}`, { method: "PUT", body: values });
        setItems((prev) => prev.map((item) => (item._id === id ? updated : item)));
        return updated;
      } catch (err) {
        setItems(previous);
        setError(err.message);
        throw err;
      }
    };

    const remove = async (id) => {
      await apiRequest(`${endpoint}/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((item) => item._id !== id));
    };

    return (
      <ResourceContext.Provider value={{ items, isLoading, error, create, update, remove, reload }}>
        {children}
      </ResourceContext.Provider>
    );
  }

  const useResource = () => useContext(ResourceContext);

  return [ResourceProvider, useResource];
}
