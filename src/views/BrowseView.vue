<template>
  <ContentComponent>
    <template #content>
      <FormHeaderComponent :error="error" />
      <textarea id="room-hex" v-model="roomId" placeholder="Room ID" @input="onRoomInput" />
      <div id="wallNo" v-if="status >= 1">
        <button
          v-for="wall in 4"
          :key="wall"
          :class="wall - 1 === wallNo ? 'active' : ''"
          @click="onWallSelect(wall - 1)"
        >
          Wall {{ wall }}
        </button>
      </div>
      <div id="wrapper">
        <div id="shelves" v-if="status >= 2">
          <div class="shelf" v-for="shelf in Object.keys(shelves)" :key="'shelf-' + shelf">
            <button
              class="volume"
              v-for="volume in Object.keys(shelves[shelf])"
              :key="'shelf-' + shelf + ':volume-' + volume"
              @click="onVolumeSelect(Number(shelf), Number(volume))"
            >
              {{ shelves[shelf][volume].title }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </ContentComponent>
</template>

<script lang="ts">
import ContentComponent from "@/components/ContentComponent.vue";
import { defineComponent } from "vue";
import FormHeaderComponent from "@/components/FormHeaderComponent.vue";
import axios from "axios";

export default defineComponent({
  name: "BrowseView",
  components: { FormHeaderComponent, ContentComponent },
  data() {
    return {
      roomId: "",
      wallNo: -1,
      shelves: {} as Record<string, Record<string, { title: string }>>,
      error: "",
      status: 0,
    };
  },
  methods: {
    validateRoom(): string {
      if (this.roomId === "") return "Please enter a room ID.";
      if (!/^[A-Z0-9]+$/.test(this.roomId))
        return "Room ID must be composed of only uppercase letters and numbers.";
      return "";
    },
    onRoomInput(): void {
      this.wallNo = -1;
      const error = this.validateRoom();
      if (error !== "") {
        this.error = error;
        this.status = 0;
        return;
      }
      this.status = 1;
      this.error = "";
    },
    onWallSelect(wallNo: number): void {
      this.wallNo = wallNo;
      this.status = 2;

      axios
        .post(this.$api + "/api/get/wall", {
          room: this.roomId,
          wall: this.wallNo.toString(),
        })
        .then((res) => {
          this.shelves = res.data.wall;
        })
        .catch((error) => {
          this.error = error.response.data.error;
        });
    },
    onVolumeSelect(shelfNo: number, volumeNo: number): void {
      this.$router.push({
        path: `/page/${this.roomId}/${this.wallNo + 1}/${shelfNo + 1}/${volumeNo + 1}/1`,
      });
    },
  },
});
</script>

<style scoped>
#wallNo {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 2px;
}

#wallNo > button {
  width: 100%;
  height: 3vh;
  border: 2px solid var(--color-border);
  border-radius: 5px;
  background-color: var(--color-accent-secondary);
  color: var(--color-text);
  font-family: "MuseoModerno", sans-serif;
  cursor: pointer;
}

#wallNo > button.active {
  background-color: var(--color-accent-primary);
}

#wrapper {
  margin-top: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

#shelves {
  display: flex;
  flex-direction: column;
  align-content: center;
  gap: 2px;
  border: 2px solid var(--color-border);
  border-radius: 5px;
  padding: 2px;
  background-color: var(--color-accent-tertiary);
  width: min(100%, 1000px);
  box-sizing: border-box;
}

.shelf {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 2px 0;
  padding: 2px;
  width: 100%;
  border-bottom: 2px solid var(--color-border);
  align-self: center;
}

.volume {
  display: flex;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  max-width: fit-content;
  height: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  align-items: center;
  font-family: "MuseoModerno", sans-serif;
  background-color: var(--color-accent-secondary);
  border: 2px solid var(--color-border);
  border-radius: 5px;
  cursor: pointer;
  color: var(--color-text);
}

.volume:hover {
  background-color: var(--color-accent-primary);
}

textarea {
  border: 2px solid var(--color-border);
  border-radius: 5px;
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: "MuseoModerno", sans-serif;
  resize: vertical;
}
</style>
