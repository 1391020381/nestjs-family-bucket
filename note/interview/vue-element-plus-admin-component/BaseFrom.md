```
在 Vue 3 中，如果你想将一个组件的所有属性透传给子组件，可以使用 v-bind="$attrs"。$attrs 是一个包含了父作用域中非 prop 特性（attribute）的绑定的对象。使用 v-bind="$attrs" 可以将这些特性透传给子组件。

// BaseFrom
<template>
  <div>
    <a-form
      ref="formRef"
      class="form-wrap"
      :class="{ disable: formProps?.isReadonly ? true : false }"
      :model="formState"
      :layout="formProps?.layout"
      :label-col="formProps?.labelCol"
      :wrapper-col="formProps?.wrapperCol"
      @finish="onFinish"
      @validate="onValidate"
    >
      <a-form-item v-if="formProps?.isPriority && formProps?.editor" name="isPriority" label="优先体验">
        <a-switch v-model:checked="formState.isPriority" />
      </a-form-item>
      <BaseFormItem v-for="(item, index) in schema" :key="index" v-model:form-state="formState" :schema="item" />
      <a-form-item v-if="formProps?.submitOnChange" :wrapper-col="{ span: 14, offset: 6 }">
        <a-row type="flex" justify="center" align="middle">
          <a-col :span="4" :offset="1">
            <a-button type="default" shape="round" @click="router.go(-1)">取消</a-button>
          </a-col>
          <a-col :span="4" :offset="1">
            <a-button type="primary" html-type="submit" shape="round" :loading="formProps.submitting">提交</a-button>
          </a-col>
          <a-col :span="4" :offset="1">
            <a-button v-if="formProps?.submitOnReset" shape="round" style="margin-left: 10px" @click="onResetFields">
              重置
            </a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <slot name="submit"></slot>
    </a-form>
    <slot name="otherButton"></slot>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import type { FormInstance } from 'ant-design-vue';
  import BaseFormItem from './BaseFormItem.vue';
  import { IBaseForm } from '../types/form';

  type BaseFormProps = IBaseForm;

  const router = useRouter();

  const props = withDefaults(defineProps<BaseFormProps>(), {
    schema: () => [],
    formProps: () => ({
      submitOnChange: true,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }),
    formValue: () => ({})
  });

  const formState = ref<Record<string, any>>({});
  const formRef = ref<FormInstance>();

  // 暴露组件内部方法
  const emit = defineEmits<{
    (e: 'onSubmit', value: Record<string, any>): void;
    (e: 'onChange', name: string, value: Record<string, any>): void;
  }>();

  const onFinish = (values: any) => {
    // console.log('Success:', values);
    emit('onSubmit', values);
  };

  const onValidate = (name: string, status: boolean, errorMsgs: any) => {
    console.log(name, status, errorMsgs, '<==onValidate');
    emit('onChange', name, formState.value);
  };

  const onResetFields = () => {
    formRef?.value?.resetFields();
    // formState.value = {};
  };

  watch(
    () => props.formValue,
    (newValue) => {
      formState.value = newValue;
      if (props.formProps?.isPriority && props.formProps?.editor) {
        formState.value.isPriority = newValue?.isPriority == 'false' ? false : true;
      }
    },
    { immediate: true } // 开启首次监听
  );

  // 通过实例暴露子组件中的方法与属性
  defineExpose({
    formRef: formRef,
    formState: formState.value
  });
</script>
<style scoped>
  .disable {
    pointer-events: none;
  }

  .form-wrap {
    padding: 22px 32px;
  }
</style>



```


```

// BaseFormItem





```