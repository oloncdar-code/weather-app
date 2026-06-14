import { renderHook, waitFor } from '@testing-library/react';
import { useWeather } from './useWeather';
import axios from 'axios';
import { describe, it, expect, vi } from 'vitest';

vi.mock('axios');

describe('useWeather', () => {
  it('должен загружать данные для координат', async () => {
    const mockData = { fact: { temp: 15, feels_like: 13, icon: 'bkn', condition: 'облачно' } };
    axios.get.mockResolvedValue({ data: mockData });

    const coords = { lat: 55.75, lon: 37.62 };
    const { result } = renderHook(() => useWeather(null, coords));

    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(mockData);
  });
});