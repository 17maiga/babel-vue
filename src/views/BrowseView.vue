<template>
  <ContentComponent>
    <template #content>
      <PageHeaderComponent :error="error" />
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
import PageHeaderComponent from "@/components/PageHeaderComponent.vue";
import axios from "axios";

export default defineComponent({
  name: "BrowseView",
  components: { PageHeaderComponent, ContentComponent },
  data() {
    return {
      roomId: "",
      // wallNo = -1: no wall selected.
      wallNo: -1,
      // shelves contains the list of volume titles for each shelf,
      // indexed by shelf number and volume number.
      shelves: {} as Record<string, Record<string, { title: string }>>,
      error: "",
      // Represents the current stage of the form.
      // 0: room ID input
      // 1: wall selection
      // 2: volume selection
      // Displayed components are determined by this value.
      status: 0,
    };
  },
  methods: {
    /** Validates the room ID. */
    validateRoom(): string {
      if (this.roomId === "") return "Please enter a room ID.";
      // Room ID must be composed of only uppercase letters and numbers.
      if (!/^[A-Z0-9]+$/.test(this.roomId))
        return "Room ID must be composed of only uppercase letters and numbers.";
      return "";
    },
    /** Called when the room ID input is changed. */
    onRoomInput(): void {
      // Reset the wall number.
      this.wallNo = -1;
      this.error = this.validateRoom();
      if (this.error !== "") {
        // Reset to room ID input stage.
        this.status = 0;
        return;
      }
      // Proceed to wall selection stage.
      this.status = 1;
    },
    /** Called when a wall is selected. */
    onWallSelect(wallNo: number): void {
      // Set the wall number.
      this.wallNo = wallNo;
      // Proceed to volume selection stage.
      this.status = 2;

      // Get the list of volumes for the selected room and wall.
      axios
        .post(this.$api + "/api/get/wall", {
          room: this.roomId,
          wall: this.wallNo.toString(),
        })
        .then((res) => {
          // Set the list of volumes.
          this.shelves = res.data.wall;
        })
        .catch((error) => {
          this.error = error.response.data.error;
        });
    },
    /** Called when a volume is selected. */
    onVolumeSelect(shelfNo: number, volumeNo: number): void {
      // Redirect to the volume page.
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
