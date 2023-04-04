<template>
  <div class="card">
    <slot name="content"></slot>
  </div>
</template>

<script lang="ts">
// This component is used to display the content of a page in a container.
// Turned into a component to avoid code duplication.

import { defineComponent } from "vue";

export default defineComponent({
  name: "ContentComponent",
});
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-left: solid 2px var(--color-border);
  border-right: solid 2px var(--color-border);
  padding: 10px;
}
</style>
