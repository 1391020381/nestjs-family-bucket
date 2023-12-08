import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routes";

import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";

createApp(App).use(router).mount("#app");
