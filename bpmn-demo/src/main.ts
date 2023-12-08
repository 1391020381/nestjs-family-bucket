import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routes";

import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";

// 右边工具栏样式
import "bpmn-js-properties-panel/dist/assets/properties-panel.css";
import "bpmn-js-properties-panel/dist/assets/element-templates.css";
createApp(App).use(router).mount("#app");
