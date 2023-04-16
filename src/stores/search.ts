import { defineStore } from "pinia";

interface SearchState {
  searchText: string;
}

export const useSearchStore = defineStore("search", {
  state: (): SearchState => ({
    searchText: "",
  }),
  actions: {
    setSearchText(searchText: string) {
      this.searchText = searchText;
    },
    getSearchText(): string {
      return this.searchText;
    },
  },
});
