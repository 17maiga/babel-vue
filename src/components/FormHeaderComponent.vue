<template>
  <div id="formHeader">
    <RouterBackComponent />
    <div v-if="error" id="errorMsg">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import RouterBackComponent from "@/components/RouterBackComponent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormHeaderComponent",
  components: { RouterBackComponent },
  props: {
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
