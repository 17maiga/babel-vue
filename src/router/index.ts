import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import BrowseView from "@/views/BrowseView.vue";
import FindView from "@/views/FindView.vue";
import PageView from "@/views/PageView.vue";

function generateRandomRoom() {
  const chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let room = "";
  const len = Math.floor(Math.random() * 150) + 1;
  for (let i = 0; i < len; i++) {
    room += chars[Math.floor(Math.random() * chars.length)];
  }
  return room;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/browse",
      name: "Browse",
      component: BrowseView,
    },
    {
      path: "/find",
      name: "Find",
      component: FindView,
    },
    {
      path: "/random",
      name: "Random",
      redirect: () => {
        const room = generateRandomRoom();
        const wall = Math.floor(Math.random() * 4) + 1;
        const shelf = Math.floor(Math.random() * 5) + 1;
        const book = Math.floor(Math.random() * 32) + 1;
        const page = Math.floor(Math.random() * 110) + 1;
        return {
          path: `/page/${room}/${wall}/${shelf}/${book}/${page}`,
        };
      },
    },
    {
      path: "/page/:room/:wall/:shelf/:book/:page",
      name: "Page",
      props: true,
      component: PageView,
    },
  ],
});

export default router;
