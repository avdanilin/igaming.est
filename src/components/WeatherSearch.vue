<template>
  <div class="weather-search">
    <input
      v-model="city"
      class="weather-search__input"
      :placeholder="$t('enterCity')"
      @keyup.enter="getWeather"
    />

    <button @click="getWeather" class="weather-search__button">
      {{ $t('search') }}
    </button>


    <!--TODO: move to component-->
    <div class="weather-search__recent">
      <p>{{ $t('recentSearches') }}:</p>

      <ul>
        <li v-for="(search, index) in recentSearches" :key="index">
          <button v-if="search.length > 0" @click="selectRecentSearch(search)">
            {{ search }}
          </button>
        </li>
      </ul>
    </div>

    <div class="weather-search__units-switch">
      <label class="weather-search__label">
        <input
          type="radio"
          value="metric"
          v-model="units"
          class="weather-search__radio"
        />
        {{ $t('celsius') }}
      </label>

      <label class="weather-search__label">
        <input
          type="radio"
          value="imperial"
          v-model="units"
          class="weather-search__radio"
        />
        {{ $t('fahrenheit') }}
      </label>
    </div>

    <div v-if="error" class="weather-search__error">{{ error }}</div>

    <div v-if="weather" class="weather-search__info">
      <h2 class="weather-search__city">{{ weather.name }}</h2>

      <p class="weather-search__temperature">
        {{ weather.main.temp }}°
        {{ units === 'metric' ? $t('celsius') : $t('fahrenheit') }}
      </p>

      <p class="weather-search__wind">
        {{ $t('wind') }}: {{ weather.wind.speed }}
        {{ getUnits }}
      </p>

      <picture>
        <img
          :src="`http://openweathermap.org/img/wn/${getIcon}@2x.png`"
          alt="Weather Icon"
          class="weather-search__icon"
        />
      </picture>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useWeather } from '@/composables/useWeather';
import { useRecentSearches } from '@/composables/useRecentSearches';

export default defineComponent({
  name: 'WeatherSearch',

  setup(_, { emit }) {
    const { city, weather, error, units, getWeather } = useWeather();

    const { recentSearches, addRecentSearch } = useRecentSearches();

    const searchWeather = () => {
      getWeather();
      addRecentSearch(city.value);

      emit('add-recent', city.value);
    };

    const selectRecentSearch = (search: string) => {
      city.value = search;

      searchWeather();
    };

    return {
      getWeather: searchWeather,
      selectRecentSearch,
      recentSearches,
      weather,
      error,
      units,
      city,
    };
  },

  computed: {
    getIcon() {
      return this.weather?.weather[0].icon;
    },

    getUnits() {
      return this.units === 'metric' ? 'm/s' : 'mph';
    },
  }
});
</script>

<style scoped>
.weather-search {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #e4e4e4;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.weather-search__input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.weather-search__button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.weather-search__button:hover {
  background-color: #0056b3;
}

.weather-search__units-switch {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 0;
  justify-content: space-between;
  margin-top: 20px;
}

.weather-search__label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.weather-search__radio {
  margin-right: 5px;
}

.weather-search__error {
  color: red;
  font-weight: bold;
  margin: 10px 0;
}

.weather-search__info {
  text-align: center;
}

.weather-search__city {
  font-size: 24px;
  margin-bottom: 10px;
}

.weather-search__temperature {
  font-size: 18px;
  margin-bottom: 5px;
}

.weather-search__description {
  font-size: 16px;
  margin-bottom: 5px;
}

.weather-search__wind {
  font-size: 16px;
  margin-bottom: 10px;
}

.weather-search__recent {
  margin-top: 20px;
}

.weather-search__recent p {
  font-weight: bold;
}

.weather-search__recent ul {
  list-style: none;
  padding: 0;
}

.weather-search__recent li {
  margin-bottom: 5px;
}

.weather-search__recent button {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
}

.weather-search__recent button:hover {
  text-decoration: underline;
}
</style>
