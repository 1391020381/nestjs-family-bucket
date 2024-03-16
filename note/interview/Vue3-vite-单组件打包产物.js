import { d as defineComponent, r as ref, o as onMounted, c as createElementBlock, a as createBaseVNode, b as openBlock, e as createApp } from "./vue.8554474a.js";

const _hoisted_1 = { class: "v-counter" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    const num = ref(0);
    const click = () => {
      num.value += 1;
    };
    onMounted(() => {
      console.log(123123123);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("button", {
          class: "v-btn",
          onClick: click
        }, "\u70B9\u51FB\u52A01")
      ]);
    };
  }
});
const index_vue_vue_type_style_index_0_lang = "";
createApp(_sfc_main).mount("#app");

// 组件打包成一个对象