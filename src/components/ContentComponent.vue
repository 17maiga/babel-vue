<template>
  <div class="card">
    <slot name="content"></slot>
  </div>
</template>

<script lang="ts">
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
  -ms-overflow-y: scroll;
  overflow-y: scroll;
}
</style>
