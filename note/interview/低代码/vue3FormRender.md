* 点击模版 -> 可编辑属性   schema -> 组件

# formData 处理
* 之前的 banner组件 举例

```

<template>
  <div>
    <formRender
      :schema="schema"
      :formData="formData"
      @on-change="change"
      @on-validate="validate"
	/>
  </div>
</template>
<script>
export default {
  name: 'App',
  setup() {
    const state = reactive({
      schema: {
        "type": "object",
        "properties": {
          "src": {
            "title": "图片地址",
            "type": "string",
            "format": "image"
          },
          "link": {
            "title": "跳转链接",
            "type": "string",
            "format": "url"
          }
        },
        "required": [
          "src"
        ]
      },
      formData: {},
    });

    const change = (v) => {
      state.formData = v;
      // console.log(v);
    }
    const onValidate = (v) => {
      console.log(v);
    }

    return {
      ...toRefs(state),
      change,
      onValidate,
    }
  }
}
</script>



```