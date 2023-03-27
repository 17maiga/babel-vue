<template>
  <CardComponent>
    <template #card_content>
      <div class="paragraph">
        Welcome to the Library of Babel.<br />
        Here, you may observe the variation of the 26 letters.
      </div>
      <div class="actions">
        <RouterLink class="link" to="/browse">Search for a specific page</RouterLink>
        <RouterLink class="link" to="/random">Go to a random page</RouterLink>
        <RouterLink class="link" to="/find">Find text in the library</RouterLink>
      </div>
    </template>
  </CardComponent>
</template>

<script lang="ts">
import CardComponent from "@/components/CardComponent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: { CardComponent },
});
</script>

<style scoped>
.paragraph {
  padding-top: 1vh;
  padding-bottom: 1vh;
  text-align: justify;
}

.actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.link {
  border: 2px solid var(--color-border);
  border-radius: 5px;
  margin: 2px;
  display: flex;
  justify-content: center;
  background: var(--color-accent-primary);
  text-decoration: none;
}

.link:hover {
  background: var(--color-accent-secondary);
}
</style>
