<template>
  <footer>
    Made by&nbsp;
    <a href="https://www.17maiga.fr" rel="noreferrer noopener" target="_blank">17maiga</a>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FooterComponent",
});
</script>

<style scoped>
footer {
  height: 3vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: Cantarell, sans-serif;
  background: var(--color-accent-tertiary);
  color: var(--color-text);
  border-top: var(--color-border) solid 2px;
}
</style>
