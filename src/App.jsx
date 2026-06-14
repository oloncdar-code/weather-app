import { CurrentLocation } from './components/CurrentLocation';
import { FavoritesList } from './components/FavoritesList';
import { AddCityForm } from './components/AddCityForm';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>🌤 Погодное приложение (Яндекс.Погода)</h1>
      <section>
        <h2>📍 Погода сейчас</h2>
        <CurrentLocation />
      </section>
      <section>
        <h2>⭐ Избранные города</h2>
        <AddCityForm />
        <FavoritesList />
      </section>
    </div>
  );
}

export default App;