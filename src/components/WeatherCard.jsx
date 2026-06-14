import { useWeather } from '../hooks/useWeather';

export function WeatherCard({ geoid, coords, title }) {
  const { data, loading, error } = useWeather(geoid, coords);

  if (loading) return <div className="card">🌤 Загрузка погоды...</div>;
  if (error) return <div className="card error">❌ Ошибка: {error}</div>;
  if (!data || !data.fact) return <div className="card error">Нет данных о погоде</div>;

  console.log('Полученные данные:', data);

if (!data.fact) return <div className="card error">Нет поля fact в ответе</div>;

  const fact = data.fact;
  const temp = fact.temp;
  const feelsLike = fact.feels_like;
  const condition = fact.condition;
  const icon = `https://yastatic.net/weather/i/icons/funky/dark/${fact.icon}.svg`;

  return (
    <div className="card">
      <h3>{title || (data.geo_object?.locality?.name ?? 'Погода')}</h3>
      <div className="weather-info">
        <img src={icon} alt={condition} />
        <div>
          <div className="temp">{temp}°C</div>
          <div className="desc">{condition}</div>
          <div className="feels">Ощущается как {feelsLike}°C</div>
        </div>
      </div>
    </div>
  );
}