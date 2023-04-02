<template>
  <header>
    <div class="logo">The Library of Babel</div>
    <div class="page_name">{{ currentRouteName }}</div>
    <nav>
      <button class="nav-element" @click="toggleTheme" id="darkModeToggle" title="Toggle dark mode">
        <FontAwesomeIcon icon="fa-solid fa-moon" v-if="theme === ''" />
        <FontAwesomeIcon icon="fa-solid fa-sun" v-else />
      </button>
      <RouterLink class="nav-element" to="/" title="Home">
        <FontAwesomeIcon icon="fa-solid fa-house" />
      </RouterLink>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default defineComponent({
  name: "HeaderComponent",
  components: { FontAwesomeIcon },
  data() {
    return {
      theme: "light", // empty means light theme
    };
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", this.theme);
    },
  },
});
</script>

<style scoped>
header {
  padding: 5px;
  border-bottom: 2px solid var(--color-border);
  background: var(--color-accent-tertiary);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: var(--color-text);
  width: 33%;
}

.page_name {
  color: var(--color-text);
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: center;
}

nav {
  display: flex;
  width: 33%;
  align-content: center;
  align-self: center;
  justify-content: flex-end;
  flex-direction: row;
}

nav > a {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.nav-element {
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-border);
  background: var(--color-accent-primary);
  color: var(--color-text);
  font-weight: bolder;
  border-radius: 10px;
  cursor: pointer;
  padding: 2px 5px;
  font-size: smaller;
  font-family: "MuseoModerno", sans-serif;
}

.nav-element:hover {
  background: var(--color-accent-secondary);
}

#darkModeToggle {
  width: 30px;
  height: 30px;
}
</style>
