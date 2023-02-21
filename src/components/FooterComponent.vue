<template>
  <footer>Babel Library</footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 3vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: Cantarell, sans-serif;
  background: var(--color-accent-primary);
  color: var(--color-text);
  border-top: var(--color-text) solid 2px;
}
</style>
