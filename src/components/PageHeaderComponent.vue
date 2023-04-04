<template>
  <div id="formHeader">
    <RouterBackComponent />
    <div v-if="error" id="errorMsg">{{ error }}</div>
  </div>
</template>

<script lang="ts">
// This component is used to display both the return button and the error message for a page.
// Turned into a component to avoid code duplication.

import RouterBackComponent from "@/components/RouterBackComponent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageHeaderComponent",
  components: { RouterBackComponent },
  props: {
    // The error message to display.
    error: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
#formHeader {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#errorMsg {
  color: var(--color-danger);
}
</style>
