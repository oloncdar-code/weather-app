import { useGeolocation } from '../hooks/useGeolocation';
import { WeatherCard } from './WeatherCard';

export function CurrentLocation() {
  const { coords, loading, error, refetch } = useGeolocation();

  if (loading) return <div className="card">📍 Определение местоположения...</div>;
  if (error) {
    return (
      <div className="card error">
        <p>Геолокация: {error}</p>
        <button onClick={refetch}>Повторить</button>
      </div>
    );
  }
  if (!coords) return null;

  return <WeatherCard coords={coords} title="Моё местоположение" />;
}