import { useCallback, useEffect, useRef, useState } from "react";

export default function useLivePoll(fetchFn, intervalMs = 10000, enabled = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const fetchRef = useRef(fetchFn);

  fetchRef.current = fetchFn;

  const refresh = useCallback(async () => {
    try {
      const result = await fetchRef.current();
      setData(result);
      setLastUpdated(new Date());
      setError("");
    } catch (err) {
      setError(err.message || "Refresh failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    refresh();
    const id = setInterval(refresh, intervalMs);
    return () => clearInterval(id);
  }, [enabled, intervalMs, refresh]);

  return { data, loading, error, lastUpdated, refresh };
}
