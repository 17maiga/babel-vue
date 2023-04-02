<template>
  <button id="routerBack" title="Back" @click="$router.back()">
    <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default defineComponent({
  name: "RouterBackComponent",
  components: { FontAwesomeIcon },
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

#routerBack:hover {
  background-color: var(--color-accent-primary);
}
</style>
