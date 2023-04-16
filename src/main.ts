import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Import local configuration (useful when running the API locally)
import config from "../conf/config.json";

import {
  faArrowLeft,
  faBackward,
  faBackwardFast,
  faForward,
  faForwardFast,
  faHouse,
  faMoon,
  faShuffle,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

import "./assets/base.css";

library.add(
  faArrowLeft,
  faBackward,
  faBackwardFast,
  faForward,
  faForwardFast,
  faHouse,
  faMoon,
  faShuffle,
  faSun
);

const app = createApp(App);
// Declare global property types
const pinia = createPinia();
declare module "vue" {
  interface ComponentCustomProperties {
    $api: string;
  }
}

// Set global property for API base URL and maximum room ID length
app.config.globalProperties.$api = config.apiURL;
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(pinia);
app.use(router);
app.mount("#app");
