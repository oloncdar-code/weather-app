import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export function useWeather(geoid, coords) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (!geoid && !coords) {
      setLoading(false);
      setData(null);
      setError(null);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = '/api/weather';
        let params = {};
        if (geoid) {
          params.geoid = geoid;
        } else if (coords) {
          params.lat = coords.lat;
          params.lon = coords.lon;
        }
        const response = await axios.get(url, { params, signal: controller.signal });
        setData(response.data);
      } catch (err) {
        if (err.name !== 'CanceledError') {
          setError(err.response?.data?.error || 'Ошибка загрузки погоды');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    return () => controller.abort();
  }, [geoid, coords]);

  return { data, loading, error };
}