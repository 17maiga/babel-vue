<template>
  <card-component>
    <template #card_content>
      <div class="header">
        <RouterBackComponent />
        <div v-if="this.error" class="error">{{ this.error }}</div>
      </div>
      <div class="wrapper">
        <div class="title">{{ this.title }}</div>
        <pre class="text-block">{{ this.text }}</pre>
        <div class="pageNo">
          Page&nbsp;
          <form @submit.prevent="this.getPage()">
            <input
              id="pageNumber"
              v-model="this.pageNo"
              :class="{ invalid: this.invalidForm }"
              name="pageNumber"
              type="text"
              @input="validateForm"
            />
          </form>
          &nbsp;of 410
        </div>
        <div class="actions">
          <button title="First" @click="this.firstPage()">
            <font-awesome-icon icon="fa-solid fa-backward-fast" />
          </button>
          <button title="Previous" @click="this.prevPage()">
            <font-awesome-icon icon="fa-solid fa-backward" />
          </button>
          <button title="Random" @click="this.randomPage()">
            <font-awesome-icon icon="fa-solid fa-shuffle" />
          </button>
          <button title="Next" @click="this.nextPage()">
            <font-awesome-icon icon="fa-solid fa-forward" />
          </button>
          <button title="Last" @click="this.lastPage()">
            <font-awesome-icon icon="fa-solid fa-forward-fast" />
          </button>
        </div>
      </div>
    </template>
  </card-component>
</template>

<script lang="ts">
import CardComponent from "@/components/CardComponent.vue";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { defineComponent } from "vue";
import RouterBackComponent from "@/components/RouterBackComponent.vue";

export default defineComponent({
  name: "PageView",
  props: ["room", "wall", "shelf", "book", "page"],
  data() {
    return {
      title: null as string | null,
      text: null as string | null,
      pageNo: this.page,
      invalidForm: false,
      error: null as string | null,
    };
  },
  components: { RouterBackComponent, FontAwesomeIcon, CardComponent },
  methods: {
    getPage() {
      if (this.invalidForm) return;
      axios
        .post(
          this.$api + "/api/page",
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
      this.error = this.invalidForm ? "Page number must be a number between 1 and 410" : null;
    },
  },
  mounted() {
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.error {
  color: var(--color-danger);
}
</style>
