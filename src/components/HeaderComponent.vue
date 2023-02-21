<template>
  <header>
    <nav>
      <RouterLink to="/">
        <button class="nav-element">Home</button>
      </RouterLink>
      <RouterLink to="/search">
        <button class="nav-element">Search</button>
      </RouterLink>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>

<style scoped>
header {
  padding: 5px;
  border-bottom: 2px solid var(--color-text);
  background: var(--color-primary);
}

nav {
  display: flex;
  width: min-content;
  align-content: center;
  align-self: center;
  flex-direction: row;
}

.nav-element {
  margin-right: 5px;
  display: block;
  border: 2px solid var(--color-text);
  font-family: Cantarell, sans-serif;
  background: var(--color-secondary);
  color: var(--color-text);
  font-weight: bolder;
  border-radius: 10px;
  cursor: pointer;
  padding: 5px;
}
</style>
