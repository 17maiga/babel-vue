<template>
  <CardComponent>
    <template #card_content>
      <div class="title">Search for a page</div>
      <div v-if="error" class="error">{{ error }}</div>
      <form id="page-address" @submit.prevent="onFormSubmit">
        <input id="room-hex" v-model="roomId" placeholder="Room ID" />
        <div class="number-inputs">
          <input
            id="wall-number"
            v-model="wallNo"
            class="number-input"
            placeholder="Wall number"
            type="number"
          />
          <input
            id="shelf-number"
            v-model="shelfNo"
            class="number-input"
            placeholder="Shelf number"
            type="number"
          />
          <input
            id="book-number"
            v-model="bookNo"
            class="number-input"
            placeholder="Book number"
            type="number"
          />
          <input
            id="page-number"
            v-model="pageNo"
            class="number-input"
            placeholder="Page number"
            type="number"
          />
        </div>
        <input type="submit" value="Search" />
      </form>
    </template>
  </CardComponent>
</template>

<script lang="ts">
import CardComponent from "@/components/CardComponent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "BrowseView",
  components: { CardComponent },
  data() {
    return {
      roomId: "",
      wallNo: null as number | null,
      shelfNo: null as number | null,
      bookNo: null as number | null,
      pageNo: null as number | null,
      error: null as string | null,
    };
  },
  methods: {
    onFormSubmit(): void {
      const address = [this.roomId, this.wallNo, this.shelfNo, this.bookNo, this.pageNo];
      const error = this.validateAddress(
        this.roomId,
        this.wallNo,
        this.shelfNo,
        this.bookNo,
        this.pageNo
      );
      if (error) {
        this.error = error;
        return;
      }
      this.$router.push({ path: `/page/${address.join("/")}` });
      this.resetFilters();
    },
    resetFilters(): void {
      this.roomId = "";
      this.wallNo = 1;
      this.shelfNo = 1;
      this.bookNo = 1;
      this.pageNo = 1;
    },
    validateAddress(
      roomId: string | null,
      wallNo: number | null,
      shelfNo: number | null,
      bookNo: number | null,
      pageNo: number | null
    ): string | null {
      // Validate each address component
      if (
        roomId === null ||
        wallNo === null ||
        shelfNo === null ||
        bookNo === null ||
        pageNo === null
      )
        return "Please fill in all fields.";
      if (!/^[A-Z0-9]+$/.test(roomId))
        return "Room ID must be composed of only uppercase letters and numbers.";
      if (wallNo > 4 || wallNo < 1) return "Wall number must be between 1 and 4.";
      if (shelfNo > 5 || shelfNo < 1) return "Shelf number must be between 1 and 5.";
      if (bookNo > 32 || bookNo < 1) return "Book number must be between 1 and 32.";
      if (pageNo > 410 || pageNo < 1) return "Page number must be between 1 and 410.";
      return null;
    },
  },
});
</script>

<style scoped>
.title {
  display: flex;
  justify-content: center;
}

.error {
  color: var(--color-danger);
  font-size: 1.5vh;
  padding-left: 1vw;
}

form {
  padding: 1vh 1vw;
  display: flex;
  flex-direction: column;
}

.number-inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

input {
  border: solid 2px var(--color-border);
  border-radius: 5px;
  margin: 2px;
  font-family: "MuseoModerno", sans-serif;
  height: 3vh;
  background: var(--color-bg);
  color: var(--color-text);
}

input[type="submit"] {
  background: var(--color-accent-primary);
  cursor: pointer;
  height: 3.5vh;
}

input[type="submit"]:hover {
  background: var(--color-accent-secondary);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  appearance: textfield;
  -moz-appearance: textfield;
}
</style>
