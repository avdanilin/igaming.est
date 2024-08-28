import { fetchWeather } from '@/shared/api/modules/weatherApi';
import { WeatherData } from '@/entities/weather';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

export function useWeather() {
  const city = ref<string>('');

  const weather = ref<WeatherData | null>(null);

  const error = ref<string | null>(null);

  const units = ref<'metric' | 'imperial'>('metric');

  const { t } = useI18n({ useScope: 'global' });

  const getWeather = async () => {
    if (!city.value) {
      error.value = t('enterCityName');

      return;
    }

    try {
      weather.value = await fetchWeather(city.value, units.value);

      error.value = null;
    } catch (err) {
      error.value = (err as Error).message;

      weather.value = null;
    }
  };

  return {
    getWeather,
    weather,
    error,
    units,
    city,
  };
}
