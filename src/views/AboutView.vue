<template>
  <ContentComponent>
    <template #content>
      <RouterBackComponent />
      <p>
        The Library of Babel is a short story by Argentine writer Jorge Luis Borges, first published
        in 1941 in the magazine Sur.
      </p>
      <p>
        The story tells of an infinite library, composed of hexagonal rooms. Bookshelves line four
        of the walls of each room, five for each wall, and each bookshelf contains thirty-two books
        of four hundred and ten pages each. Each page contains forty lines of eighty characters
        each, or three thousand two hundred characters per page, and the library is said to contain
        every possible permutation of the twenty-six letters of the alphabet, the comma, the dot and
        the space, in every possible order.
      </p>
      <p>
        This website is a digital recreation of the Library of Babel, allowing you to browse its
        books, searching for meaning in the endless sea of random text.
      </p>
    </template>
  </ContentComponent>
</template>

<script lang="ts">
import ContentComponent from "@/components/ContentComponent.vue";
import { defineComponent } from "vue";
import RouterBackComponent from "@/components/RouterBackComponent.vue";

export default defineComponent({
  name: "AboutView",
  components: { RouterBackComponent, ContentComponent },
});
</script>

<style scoped>
p {
  margin: 5px 0;
  text-align: justify;
}
</style>
