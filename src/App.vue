<template>
  <div class="weather">
    <select v-model="$i18n.locale">
      <option value="en">English</option>
      <option value="ru">Русский</option>
    </select>

    <WeatherSearch />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WeatherSearch from './components/WeatherSearch.vue';

export default defineComponent({
  name: 'App',

  components: {
    WeatherSearch,
  },
});
</script>

<style scoped>
#app,
.weather {
  height: 100vh;
}
</style>
