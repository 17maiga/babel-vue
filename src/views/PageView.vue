<template>
  <ContentComponent>
    <template #content>
      <FormHeaderComponent :error="error" />
      <div class="wrapper">
        <div class="title">{{ title }}</div>
        <pre class="text-block">{{ text }}</pre>
        <div class="pageNo">
          Page&nbsp;
          <form @submit.prevent="getPage()">
            <input
              id="pageNumber"
              v-model="pageNo"
              :class="{ invalid: invalidForm }"
              name="pageNumber"
              type="text"
              @input="validateForm"
            />
          </form>
          &nbsp;of 410
        </div>
        <div class="actions">
          <button title="First" @click="firstPage()">
            <FontAwesomeIcon icon="fa-solid fa-backward-fast" />
          </button>
          <button title="Previous" @click="prevPage()">
            <FontAwesomeIcon icon="fa-solid fa-backward" />
          </button>
          <button title="Random" @click="randomPage()">
            <FontAwesomeIcon icon="fa-solid fa-shuffle" />
          </button>
          <button title="Next" @click="nextPage()">
            <FontAwesomeIcon icon="fa-solid fa-forward" />
          </button>
          <button title="Last" @click="lastPage()">
            <FontAwesomeIcon icon="fa-solid fa-forward-fast" />
          </button>
        </div>
      </div>
    </template>
  </ContentComponent>
</template>

<script lang="ts">
import ContentComponent from "@/components/ContentComponent.vue";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { defineComponent } from "vue";
import FormHeaderComponent from "@/components/FormHeaderComponent.vue";

export default defineComponent({
  name: "PageView",
  props: ["room", "wall", "shelf", "book", "page"],
  data() {
    return {
      title: null as string | null,
      text: null as string | null,
      pageNo: this.page,
      invalidForm: false,
      error: "",
    };
  },
  components: { FormHeaderComponent, FontAwesomeIcon, ContentComponent },
  methods: {
    getTitle() {
      axios
        .post(
          this.$api + "/api/get/title",
          {
            room: this.room,
            wall: String(Number(this.wall) - 1),
            shelf: String(Number(this.shelf) - 1),
            volume: String(Number(this.book) - 1),
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          this.title = res.data["title"];
        });
    },
    getPage() {
      if (this.invalidForm) return;
      axios
        .post(
          this.$api + "/api/get/page",
          {
            room: this.room,
            wall: String(Number(this.wall) - 1),
            shelf: String(Number(this.shelf) - 1),
            volume: String(Number(this.book) - 1),
            page: String(Number(this.pageNo) - 1),
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          this.text = res.data["page"].match(/.{1,80}/g).join("\n");
        });
    },
    firstPage() {
      this.pageNo = 1;
      this.getPage();
    },
    prevPage() {
      if (this.pageNo > 1) this.pageNo--;
      this.getPage();
    },
    randomPage() {
      this.pageNo = Math.floor(Math.random() * 410) + 1;
      this.getPage();
    },
    nextPage() {
      if (this.pageNo < 410) this.pageNo++;
      this.getPage();
    },
    lastPage() {
      this.pageNo = 410;
      this.getPage();
    },
    validateForm() {
      this.invalidForm = isNaN(this.pageNo) || this.pageNo < 1 || this.pageNo > 410;
      this.error = this.invalidForm ? "Page number must be a number between 1 and 410" : "";
    },
  },
  mounted() {
    this.getTitle();
    this.getPage();
  },
  updated() {
    this.getPage();
  },
});
</script>

<style scoped>
.wrapper {
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
}

.pageNo {
  display: flex;
  flex-direction: row;
}

.text-block {
  font-family: "IBM Plex Mono", monospace;
  font-size: smaller;
  width: 100%;
  text-align: center;
  margin-top: 0;
}

.actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.actions > button {
  margin: 2px;
}

.actions > button:hover {
  background-color: var(--color-accent-primary);
}

button {
  border: solid 2px var(--color-border);
  border-radius: 5px;
  background-color: var(--color-accent-tertiary);
  color: var(--color-text);
  cursor: pointer;
}

#pageNumber {
  width: 30px;
  border: solid 2px var(--color-border);
  border-radius: 5px;
  text-align: center;
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: "MuseoModerno", sans-serif;
}
</style>
