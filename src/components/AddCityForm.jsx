import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const fetchCityCoords = async (cityName) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json&limit=1`);
  const data = await response.json();
  if (data[0]) {
    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon), name: data[0].display_name.split(',')[0] };
  }
  return null;
};

export function AddCityForm() {
  const [cityName, setCityName] = useState('');
  const [loadingGeo, setLoadingGeo] = useState(false);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName.trim()) return;
    setLoadingGeo(true);
    const cityData = await fetchCityCoords(cityName);
    setLoadingGeo(false);
    if (!cityData) {
      alert('Город не найден');
      return;
    }

    setFavorites(prev => {
      const exists = prev.some(fav => fav.name === cityData.name);
      if (!exists) {
        return [...prev, cityData];
      } else {
        alert('Город уже в избранном');
        return prev;
      }
    });
    setCityName('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        placeholder="Название города (например, Москва)"
        required
      />
      <button type="submit" disabled={loadingGeo}>
        {loadingGeo ? 'Поиск...' : 'Добавить в избранное'}
      </button>
    </form>
  );
}