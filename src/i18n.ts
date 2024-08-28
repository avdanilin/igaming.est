import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    search: 'Search',
    enterCity: 'Enter city',
    celsius: 'Celsius',
    fahrenheit: 'Fahrenheit',
    wind: 'Wind',
    cityNotFound: 'City not found',
    recentSearches: 'Recent Searches',
    enterCityName: 'Please enter a city name',
    cityNotFoundOrError: 'City not found or API error',
  },
  ru: {
    search: 'Поиск',
    enterCity: 'Введите город',
    celsius: 'Цельсий',
    fahrenheit: 'Фаренгейт',
    wind: 'Ветер',
    cityNotFound: 'Город не найден',
    recentSearches: 'Недавние запросы',
    enterCityName: 'Введите название города',
    cityNotFoundOrError: 'Город не найден или ошибка API',
  },
};

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

export default i18n;
