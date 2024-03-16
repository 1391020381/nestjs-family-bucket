<template>
  <div>
    <form @submit.prevent="onSubmit">
     <el-row :gutter="20">
        <el-col
          v-for="(item, index) in formData"
          :key="item.modelValue"
          :xs="{ span: 24 }"
          :sm="{ span: 24 }"
          :md="{ span: 24 / (item.layout || 1) }"
          :lg="{ span: 24 / (item.layout || 1) }"
          :xl="{ span: 24 / (item.layout || 1) }"
        >
    <component
        v-for="(item, index) in formData"
        :is="item.type"
        :key="item.modelValue"
        v-bind="generateBindProps(item)"
      ></component>
        </el-col>
      </el-row>

      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script>
const json = [
  {
    "type": "el-select",
    "modelValue": "select1",
    "title": "下拉框1",
    "options": [],
    "api": "/api/path/for/select1",
    "events": {
      "change": function(val) {
        console.log("select1 changed, new value is " + val);
      }
    },
    "affect": "select2",
    "affectFunction": function(affectItem, currentItem) {
      // 根据当前项的值过滤被影响项的options
      affectItem.options = affectItem.allOptions.filter(option => option.includes(currentItem.modelValue));
    }
  },
  // your other form items...
]
import { ref, watch } from "vue";
import axios from 'axios';

export default {
  props: {
    formDataJson: {
      type: Array,
      required: true
    }
  },

  setup(props) {
    let formData = ref([]);

    watch(() => props.formDataJson, (newVal) => {
      formData.value = newVal.map((item) => ({
        ...item,
        modelValue: '',
      }));
    }, { immediate: true });
    // 处理联动
     watch(() => formData.value, (newVal) => {
      newVal.forEach(item => {
        if(item.affect && item.affectFunction) {
          let affectItem = newVal.find(i => i.modelValue === item.affect);
          if(affectItem) {
            item.affectFunction(affectItem, item);
          }
        }
      });
    }, { deep: true });
    const generateBindProps = (item) => {
      let bindProps = {
        'v-model': item.modelValue,
        type: item.type,
        label: item.title,
      };
  
      if (item.events) {
        for (let eventName in item.events) {
          bindProps[`on${eventName}`] = item.events[eventName];
        }
      }

      if (item.api){
        bindProps['onMounted'] = async () => {
          let response = await axios.get(item.api);
          if (response && response.data) {
            item.options = response.data;
          }
        }
      }

      return bindProps;
    };

    const onSubmit = () => console.log(formData.value.map(item => item.modelValue));

    return { formData, generateBindProps, onSubmit };
  },
};
</script>