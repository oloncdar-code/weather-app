import { useLocalStorage } from '../hooks/useLocalStorage';
import { WeatherCard } from './WeatherCard';

export function FavoritesList() {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const removeFavorite = (name) => {
    setFavorites(prev => prev.filter(fav => fav.name !== name));
  };

  if (favorites.length === 0) {
    return <div className="card">⭐ Нет избранных городов. Добавьте город в форму выше.</div>;
  }

  return (
    <div className="favorites-grid">
      {favorites.map(fav => (
        <div key={fav.name} className="favorite-item">
          <WeatherCard coords={{ lat: fav.lat, lon: fav.lon }} title={fav.name} />
          <button onClick={() => removeFavorite(fav.name)} className="remove-btn">Удалить</button>
        </div>
      ))}
    </div>
  );
}