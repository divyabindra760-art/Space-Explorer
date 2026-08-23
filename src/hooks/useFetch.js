import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for reusable data fetching with lifecycle handling
 * Demonstrates useState, useEffect, useCallback, async/await, and error handling.
 */
export function useFetch(fetchFn, autoFetch = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const executeFetch = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    if (autoFetch) {
      executeFetch();
    }
  }, [autoFetch, executeFetch]);

  return { data, loading, error, refetch: executeFetch };
}
