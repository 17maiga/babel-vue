import { defineStore } from "pinia";

// Interface to declare the store state's type
interface SearchState {
  searchText: string;
}

// Define the store
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
