```
// BaseFormItem


<template>
  <a-form-item
    v-show="schema?.visible !== undefined ? schema?.visible : true"
    :extra="schema?.extra"
    :name="schema?.field"
    :label="!getLabel(schema) || hideLabel ? '' : schema?.label"
    :rules="schema?.rules"
    :required="schema?.required"
    :has-feedback="editorForm"
    :label-col="schema.labelCol"
    :wrapper-col="schema.wrapperCol"
  >
    <BaseUpload
      v-if="schema?.component == ('a-upload' || 'upload')"
      v-model:file-list="updateFormState[schema?.field]"
      :list-type="schema?.uploadProps?.listType"
      :upload-type="schema?.uploadProps?.uploadType"
      :max-count="schema?.uploadProps?.maxCount"
      :description="schema?.uploadProps?.description"
      :custom-request="schema?.uploadProps?.customRequest"
      :before-upload="schema?.uploadProps?.beforeUpload"
      :preview-file="schema?.uploadProps?.previewFile"
      @remove="schema?.uploadProps?.onRemove"
    />
    <Editor
      v-if="schema?.component == 'Editor'"
      v-model:value="updateFormState[schema?.field]"
      :upload-params="schema?.editorProps?.uploadParams"
      @update-editor="schema?.editorProps?.updateEditor"
    />
    <ColorPickerCmp
      v-if="schema?.component == 'a-color-picker'"
      v-model:colorValue="updateFormState[schema?.field]"
      :format="schema?.colorFormat"
    />
    <EditorTable
      v-if="schema?.component == 'EditorTable'"
      v-model:selectedTableKeys="updateFormState[schema?.field]"
      :columns="schema?.editorTableConfig?.columns"
      :data-source="schema?.editorTableConfig?.dataSource"
      :export-config="schema?.editorTableConfig?.exportConfig"
      :has-check="schema?.editorTableConfig?.hasCheck"
      :row-selection="schema?.editorTableConfig?.rowSelection"
      :row-key="schema?.editorTableConfig?.rowKey"
      :is-pagination="schema?.editorTableConfig?.isPagination"
      @on-save-cell="schema?.editorTableConfig?.onSaveCell"
      @on-select-cell="schema?.editorTableConfig?.onSelectCell"
    />
    <MultipleTable
      v-if="schema?.component == 'MultipleTable'"
      v-model:optionValue="updateFormState[schema?.field]"
      :option-list="schema?.options"
      :mode="(schema?.mode as any)"
      :editor-table-config="schema?.editorTableConfig"
    />
    <component
      :is="schema?.component"
      v-else
      v-model:value="updateFormState[schema?.field]"
      allow-clear
      :placeholder="schema?.placeholder"
      :type="schema?.type"
      :picker="schema?.picker"
      :show-time="schema?.showTime"
      :format="schema?.format"
      :value-format="schema?.format"
      :mode="schema?.mode"
      :options="schema?.options"
      :disabled="schema?.disabled"
      :max="schema?.max"
      :min="schema?.min"
      :disabled-date="schema?.disabledDate"
      :bordered="!hideBorder"
      :level="schema?.headLevel"
      :enter-button="schema?.enterButton"
      :rows="schema?.textRow || 6"
      :show-count="schema?.showCount"
      :show-search="schema?.showSearch"
      :maxlength="schema?.maxLength"
      :addon-after="schema?.addonAfter"
      :addon-before="schema?.addonBefore"
      :style="{ minWidth: schema?.component == 'a-select' ? '120px' : 0, ...schema?.style }"
      :filter-option="schema?.selectFilterOption"
      @change="schema?.onChange"
    >
      <template v-if="schema.prefix" #prefix>
        <SearchOutlined />
      </template>
      <template v-if="schema.suffix" #suffix>
        <SearchOutlined />
      </template>
      <template v-if="schema.icon" #icon>
        <SearchOutlined />
      </template>
      {{ getLabel(schema) ? '' : schema.label }}
    </component>
  </a-form-item>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { FormSchema } from '../types/form';
  import BaseUpload from './BaseUpload.vue';
  import Editor from './Editor.vue';
  import ColorPickerCmp from './ColorPickerCmp.vue';
  import EditorTable from './EditorTable.vue';
  import MultipleTable from './MultipleTable.vue';

  interface FormItemProps {
    schema: FormSchema;
    formState: Record<string, any>;
    hideLabel: boolean;
    hideBorder: boolean;
    editorForm: boolean;
  }

  const props = withDefaults(defineProps<FormItemProps>(), {
    schema: () => ({} as FormSchema),
    formState: () => ({}),
    hideLabel: false,
    hideBorder: false,
    editorForm: true
  });

  // 利用computed进行父子组件的双向数据绑定
  const emit = defineEmits(['update:formState']);
  const updateFormState = computed({
    get() {
      return props.formState;
    },
    set(val) {
      emit('update:formState', val);
    }
  });

  const getLabel = (schema: FormSchema) => {
    if (schema.component.includes('typography')) {
      return false;
    }
    return true;
  };
</script>
<style scoped></style>




```