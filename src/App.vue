<script lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { FooterComponent, HeaderComponent },
});
</script>

<template>
  <HeaderComponent />
  <main>
    <div class="content">
      <RouterView />
    </div>
  </main>
  <FooterComponent />
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  background: linear-gradient(90deg, var(--color-accent-secondary) 20px, transparent 1%) center,
    linear-gradient(var(--color-accent-secondary) 20px, transparent 1%) center, var(--color-border);
  background-size: 22px 22px;
}

.content {
  width: 70%;
}
</style>
