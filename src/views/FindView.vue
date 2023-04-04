<template>
  <ContentComponent>
    <template #content>
      <PageHeaderComponent :error="error" />
      What do you wish to find in the library?
      <div id="findType">
        <button id="title" :class="mode === 'Title' ? 'active' : ''" @click="toggleMode('Title')">
          Title
        </button>
        <button id="text" :class="mode === 'Text' ? 'active' : ''" @click="toggleMode('Text')">
          Text
        </button>
      </div>
      <form @submit.prevent v-if="mode !== ''">
        <textarea v-model="input" placeholder="Enter your text..." />
        <div class="actions">
          <input type="submit" value="Find randomly" v-if="mode === 'Text'" @click="find(false)" />
          <input type="submit" value="Find exactly" v-if="mode === 'Text'" @click="find(true)" />
          <input
            type="submit"
            value="Find volume"
            v-else-if="mode === 'Title'"
            @click="find(true)"
          />
        </div>
      </form>
    </template>
  </ContentComponent>
</template>

<script lang="ts">
import ContentComponent from "@/components/ContentComponent.vue";
import { defineComponent } from "vue";
import axios from "axios";
import PageHeaderComponent from "@/components/PageHeaderComponent.vue";

export default defineComponent({
  name: "FindView",
  components: { PageHeaderComponent, ContentComponent },
  data() {
    return {
      input: undefined as string | undefined,
      error: "",
      // mode represents what we are searching for. Possible values are "Title" and "Text", and the empty string.
      // Different html elements are shown depending on the value of mode.
      mode: "",
    };
  },
  methods: {
    /** Toggle the search mode. */
    toggleMode(mode: string): void {
      this.mode = this.mode === mode ? "" : mode;
    },
    /** Find the search text according to the search mode */
    find(exact: boolean): void {
      // Validate the input.
      this.error = this.validate();
      if (this.error !== "") return;
      // Send the request to the server.
      axios
        .post(this.$api + (this.mode === "Text" ? "/api/find/page" : "/api/find/title"), {
          input: this.input,
          exact: exact,
        })
        .then((res) => {
          // If the search was successful, redirect to the page.
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
        })
        .catch((err) => {
          console.log(err.response.data["error"]);
        });
    },
    /** Validate the search input according to the search mode. */
    validate(): string {
      // If the mode is not set, we can't search.
      if (this.mode === "") return "Please select a search option.";
      // If the input is empty, we can't search.
      if (this.input === undefined || this.input === "") return "Can't search for nothing.";
      // Find the maximum length of the input depending on the search mode.
      const length = this.mode === "Text" ? 3200 : 25;
      // If the input is too long, we can't search.
      if (this.input.length > length)
        return `${this.mode} can't be longer than ${length} characters.`;
      // If the input is not composed of lowercase letters, spaces, commas and periods only, we can't search.
      if (!/^[a-z ,.]+$/.test(this.input))
        return "Text can only contain lowercase letters, spaces, commas and periods.";
      return "";
    },
  },
});
</script>

<style scoped>
#findType {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 2px 0;
}

#findType > button {
  width: 50%;
  background-color: var(--color-accent-tertiary);
  border: solid 2px var(--color-border);
  border-radius: 5px;
  font-family: "MuseoModerno", sans-serif;
  color: var(--color-text);
  cursor: pointer;
}

#findType > button:hover {
  background-color: var(--color-accent-secondary);
}

#findType > button.active {
  background-color: var(--color-accent-primary);
}

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
}

input[type="submit"] {
  background: var(--color-accent-primary);
  height: 3vh;
}

input:hover {
  background: var(--color-accent-secondary);
}

.actions {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.actions > input {
  width: 100%;
  cursor: pointer;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
