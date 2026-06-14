import { render, screen } from '@testing-library/react';
import { WeatherCard } from './WeatherCard';
import { useWeather } from '../hooks/useWeather';
import { vi } from 'vitest';

vi.mock('../hooks/useWeather');

describe('WeatherCard', () => {
  it('отображает загрузку', () => {
    useWeather.mockReturnValue({ loading: true, data: null, error: null });
    render(<WeatherCard geoid="1" title="Тест" />);
    expect(screen.getByText(/загрузка/i)).toBeInTheDocument();
  });

  it('отображает данные', () => {
    const mockData = {
      fact: { temp: 22, feels_like: 20, icon: 'skc', condition: 'ясно' },
      geo_object: { locality: { name: 'Москва' } }
    };
    useWeather.mockReturnValue({ loading: false, data: mockData, error: null });
    render(<WeatherCard geoid="1" title="Москва" />);
    expect(screen.getByText('22°C')).toBeInTheDocument();
    expect(screen.getByText('ясно')).toBeInTheDocument();
  });
});