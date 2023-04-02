<template>
  <button id="routerBack" title="Back" @click="$router.back()">
    <font-awesome-icon icon="fa-solid fa-arrow-left" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RouterBackComponent",
});
</script>

<style scoped>
#routerBack {
  border: solid 2px var(--color-border);
  border-radius: 5px;
  background-color: var(--color-accent-tertiary);
  color: var(--color-text);
  cursor: pointer;
}
</style>
