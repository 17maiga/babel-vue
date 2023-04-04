import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import BrowseView from "@/views/BrowseView.vue";
import FindView from "@/views/FindView.vue";
import PageView from "@/views/PageView.vue";
import AboutView from "@/views/AboutView.vue";

// Import configuration for maximum room ID length.
import config from "../../conf/config.json";

/** Generate a random room ID. */
function generateRandomRoom() {
  // Characters to use in the room ID.
  const chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let room = "";
  // Generate a random length between 1 and the maximum length set in config.json.
  const len = Math.floor(Math.random() * config.maxRoomIDLength) + 1;
  for (let i = 0; i < len; i++) {
    // Add a random character to the room ID.
    room += chars[Math.floor(Math.random() * chars.length)];
  }
  return room;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Home page.
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      // Browse page.
      path: "/browse",
      name: "Browse",
      component: BrowseView,
    },
    {
      // Find page.
      path: "/find",
      name: "Find",
      component: FindView,
    },
    {
      // Random page. Generates a random page address and redirects to it.
      path: "/random",
      name: "Random",
      redirect: () => {
        // Generate a random room ID, wall, shelf, book, and page.
        const room = generateRandomRoom();
        const wall = Math.floor(Math.random() * 4) + 1;
        const shelf = Math.floor(Math.random() * 5) + 1;
        const book = Math.floor(Math.random() * 32) + 1;
        const page = Math.floor(Math.random() * 110) + 1;
        // Redirect to the generated page.
        return {
          path: `/page/${room}/${wall}/${shelf}/${book}/${page}`,
        };
      },
    },
    {
      // Page view. Path parameters are the room id, wall, shelf, book, and page numbers.
      path: "/page/:room/:wall/:shelf/:book/:page",
      name: "Page",
      props: true,
      component: PageView,
    },
    {
      // About page.
      path: "/about",
      name: "About",
      component: AboutView,
    },
  ],
});

export default router;
