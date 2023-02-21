<script lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  components: { FooterComponent, HeaderComponent },
  data() {},
};
</script>

<template>
  <HeaderComponent />
  <div>
    <RouterView />
  </div>
  <FooterComponent />
</template>

<style scoped></style>
