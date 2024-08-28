import { ref } from 'vue';

const RECENT_SEARCHES_KEY = 'recent-searches';

const MAX_RECENT_SEARCHES = 5;

export function useRecentSearches() {
  const recentSearches = ref<string[]>(getRecentSearches());

  function getRecentSearches(): string[] {
    const searches = localStorage.getItem(RECENT_SEARCHES_KEY);

    return searches ? JSON.parse(searches) : [];
  }

  function addRecentSearch(city: string) {
    let searches = getRecentSearches();

    searches = searches.filter((search) => search.toLowerCase() !== city.toLowerCase());

    searches.unshift(city);

    if (searches.length > MAX_RECENT_SEARCHES) {
      searches.pop();
    }

    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));

    recentSearches.value = searches;
  }

  return {
    addRecentSearch,
    recentSearches,
  };
}
