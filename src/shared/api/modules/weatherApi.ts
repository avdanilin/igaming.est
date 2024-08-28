import { WeatherApiResponse } from '@/entities/weather';

const API_KEY = import.meta.env.VITE_APP_API_WEATHER_KEY;

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchWeather(city: string, units: 'metric' | 'imperial'): Promise<WeatherApiResponse> {
    const apiUrl = `${BASE_URL}/weather?q=${city}&units=${units}&appid=${API_KEY}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error('City not found or API error');
    }

    const data = await response.json();

    return data as WeatherApiResponse;
}
