<template>
    <el-form ref="form" :model="formModel" :rules="formRules" @submit.native.prevent="handleSubmit">
      <component
        v-for="(item, index) in formData"
        :key="index"
        :is="item.component"
        v-bind="item.props"
        v-model="formModel[item.model]"
      >
        <el-option
          v-for="(option, index) in item.options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
          v-if="item.component === 'el-select'"
        />
      </component>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </template>
  /** 
   
  
  **/
  <script>
  import { onMounted, ref } from 'vue';
  import { ElInput, ElInputNumber, ElSwitch, ElCheckbox, ElSelect, ElOption } from 'element-plus';
  import axios from 'axios';
  
  export default {
    name: 'FormRender',
    components: {
      ElInput,
      ElInputNumber,
      ElSwitch,
      ElCheckbox,
      ElSelect,
      ElOption,
    },
    props: {
      schema: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const formModel = ref({});
      const formRules = ref({});
      const formData = ref([]);
  
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form data:', formModel.value);
      };
  
      const generateForm = async () => {
        for (let key in props.schema.properties) {
          let item = props.schema.properties[key];
          let formItem;
  
          switch (item.type) {
            case 'string':
              if (typeof item.enum === 'string' && item.enum.startsWith('http')) {
                formItem = generateAsyncSelect(key, item);
              } else {
                formItem = {
                  component: 'el-input',
                  props: { label: item.description },
                  model: key,
                };
              }
              break;
            // ...
            default:
              break;
          }
  
          // Form rules for validation, if required
          if (item.required) {
            formRules.value[key] = [{ required: true, message: item.description + ' is required.' }];
          }
  
          formData.value.push(formItem);
        }
      };
  
      // A function to handle select items that load options asynchronously
      const generateAsyncSelect = async (key, item) => {
        const options = ref([]);
        const loading = ref(true);
        try {
          const response = await axios.get(item.enum);
          options.value = response.data;
          loading.value = false;
        } catch (error) {
          console.error('Error loading select options: ', error);
          loading.value = false;
        }
  
        return {
          component: 'el-select',
          props: { label: item.description, loading: loading.value },
          model: key,
          options: options.value,
        };
      };
  
      onMounted(() => {
        generateForm();
      });
  
      return { formModel, formData, formRules, handleSubmit };
    },
  };
  </script>