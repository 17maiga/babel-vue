import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

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

declare module "vue" {
  interface ComponentCustomProperties {
    $api: string;
  }
}

app.config.globalProperties.$api = config.apiURL;

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.mount("#app");
