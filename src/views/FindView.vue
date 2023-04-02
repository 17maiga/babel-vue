<template>
  <CardComponent>
    <template #card_content>
      <div class="header">
        <RouterBackComponent />
        <div v-if="this.error" class="error">{{ this.error }}</div>
      </div>
      <form @submit.prevent>
        <textarea v-model="text" placeholder="Enter your text..." @input="validateText" />
        <div class="actions">
          <input type="submit" value="Find randomly" @click="find(false)" />
          <input type="submit" value="Find exactly" @click="find(true)" />
        </div>
      </form>
    </template>
  </CardComponent>
</template>

<script lang="ts">
import CardComponent from "@/components/CardComponent.vue";
import { defineComponent } from "vue";
import axios from "axios";
import RouterBackComponent from "@/components/RouterBackComponent.vue";

export default defineComponent({
  name: "FindView",
  components: { RouterBackComponent, CardComponent },
  data() {
    return {
      text: null as string | null,
      error: null as string | null,
    };
  },
  methods: {
    find(exact: boolean): void {
      if (this.text === null) return;
      if (!this.validateText()) return;
      axios
        .post(this.$api + "/api/find", {
          text: this.text,
          exact: exact,
        })
        .then((res) => {
          this.$router.push(
            "/page/" +
              res.data.room +
              "/" +
              String(Number(res.data.wall) + 1) +
              "/" +
              String(Number(res.data.shelf) + 1) +
              "/" +
              String(Number(res.data.volume) + 1) +
              "/" +
              String(Number(res.data.page) + 1)
          );
        });
    },
    validateText(): boolean {
      if (this.text === null || this.text === "") {
        this.error = "Can't search for nothing.";
        return false;
      }
      if (this.text.length > 3200) {
        this.error = "Text can't be longer than 3200 characters.";
        return false;
      }
      const digits = "abcdefghijklmnopqrstuvwxyz. ,";
      for (let i = 0; i < this.text.length; i++)
        if (digits.indexOf(this.text[i]) === -1) {
          this.error = "Text can only contain lowercase letters, spaces, commas and periods.";
          return false;
        }
      this.error = null;
      return true;
    },
  },
});
</script>

<style scoped>
form {
  padding: 1vh 1vw;
  display: flex;
  flex-direction: column;
}

input,
textarea {
  border: 2px solid var(--color-border);
  border-radius: 5px;
  font-family: "MuseoModerno", sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text);
}

textarea {
  resize: vertical;
  font-family: "IBM Plex Mono", monospace;
}

input {
  background: var(--color-accent-primary);
  height: 3vh;
}

input:hover {
  background: var(--color-accent-secondary);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.error {
  color: var(--color-danger);
}

.actions {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.actions > input {
  width: 50%;
}
</style>
