```
// Ant Design Vue

<template>
  <FilterForm
    v-model:formValue="updateFilterFormState"
    :schema="filterSchema"
    :go-path="goPath"
    :search-loading="pageData.searchLoading"
    :button-group="buttonGroup"
    :export-config="exportConfig"
    :has-export="hasExport"
    :has-default-btn="hasDefaultBtn"
    :export-disabled="pageData.exportDisabled"
    :default-value="props.hasDefaultParams ? props.apiParams : {}"
    @on-form-created="handleCreated"
    @on-form-search="handleSearch"
    @on-form-reset="handleReset"
  />
  <a-table
    :columns="columns"
    :data-source="tableList"
    :pagination="isPagination ? paginationConfig : false"
    :row-key="(item: any) => item.id"
    :loading="pageData.tableLoading || props.tableLoading"
    :scroll="{ x: 'max-content' }"
    :style="{ marginTop: '10px' }"
    @change="handleTableChange"
  >
    <template #headerCell="{ column, record }">
      <slot :column="column" :record="record" name="headerCell"></slot>
    </template>
    <template #bodyCell="{ column, record }">
      <slot :column="column" :record="record" name="bodyCell"></slot>
    </template>
  </a-table>
</template>

<script setup lang="ts">
  import { computed, reactive, onMounted, watch } from 'vue';
  import { BaseQuery, BaseTableProps, FetchResponse } from '../types/component';
  import FilterForm from './FilterForm.vue';
  import { getChangeFormState } from '@libs/utils';

  interface PageData {
    current: number;
    pageSize: number;
    total: number;
    tableList: Record<string, any>[];
    tableLoading: boolean;
    searchLoading: boolean;
    exportDisabled: boolean;
    queryCriteria: Record<string, any>;
  }

  const emit = defineEmits<{
    (e: 'onFormSearch', value: Record<string, any>): void;
    (e: 'onFormReset'): void;
    (e?: 'onFormCreated', value?: Record<string, any>): void;
    (e?: 'onTableChange'): void;
    (e: 'update:filterValue', value: Record<string, any>): void;
  }>();

  const props = withDefaults(defineProps<BaseTableProps>(), {
    columns: () => [],
    filterSchema: () => [],
    fetchApi: (_params?: BaseQuery | Record<string, any>): Promise<FetchResponse> => {
      return new Promise((resolve, reject) => {
        resolve({
          data: {
            dataList: [],
            pageNum: 1,
            pageSize: 10,
            totalCount: 0
          },
          code: 200,
          message: 'ok'
        });
      });
    },
    apiParams: () => ({}),
    pagination: () => ({}),
    dataSource: () => [],
    firstLoad: true,
    isPagination: true,
    hasDefaultBtn: true,
    hasDefaultParams: false
  });

  const pageData: PageData = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
    tableList: [],
    tableLoading: false,
    queryCriteria: {},
    searchLoading: false,
    exportDisabled: false
  });

  const paginationConfig = computed(() => ({
    total: pageData.total,
    current: pageData.current,
    pageSize: pageData.pageSize,
    showTotal: (total: number) => `共 ${total} 条`,
    ...props.pagination
  }));

  const tableList = computed(() => (props.dataSource.length ? props.dataSource : pageData.tableList));

  const updateFilterFormState = computed({
    get() {
      return props.filterValue || {};
    },
    set(val) {
      emit('update:filterValue', val);
    }
  });

  const handleFetchTableList = async (): Promise<Record<string, any>> => {
    const { fetchApi, isPagination, apiParams, filterValue } = props;
    pageData.tableLoading = true;
    try {
      const query =
        !isPagination && apiParams
          ? apiParams
          : {
              pageNum: isPagination ? pageData.current : 1,
              pageSize: isPagination ? pageData.pageSize : 9999,
              queryCriteria: getChangeFormState(pageData.queryCriteria, pageData.queryCriteria?.CONVERT)
            };
      const { data } = await fetchApi(query);

      const fetchData = data?.dataList ? data : (data as Record<string, any>)?.goldDetailPageInfo;

      // 特殊处理列表数据返回实际比pageSize大
      if (filterValue?.size) {
        pageData.pageSize = fetchData?.dataList.length > 10 ? fetchData?.dataList.length : 10;
      }

      pageData.tableList = fetchData?.dataList || [];
      pageData.current = fetchData?.pageNum || 1;
      pageData.total = fetchData?.totalCount || 0;
      pageData.exportDisabled = fetchData?.totalCount > 0 ? false : true;
      pageData.tableLoading = false;
      return data;
    } catch (error) {
      console.log(error, '<==fetchTableList.error');
      pageData.exportDisabled = true;
      pageData.tableLoading = false;
      return {};
    }
  };

  const handleTableChange = async (page: { current: number; pageSize: number }) => {
    pageData.pageSize = page.pageSize;
    pageData.current = page.current;
    await handleFetchTableList();
    emit('onTableChange');
  };

  const handleCreated = (value?: Record<string, any>) => {
    emit('onFormCreated', value);
  };

  const handleSearch = (value: Record<string, any>) => {
    pageData.searchLoading = true;
    pageData.queryCriteria = value;
    handleFetchTableList();
    pageData.searchLoading = false;
    emit('onFormSearch', value);
  };

  const handleReset = () => {
    pageData.current = 1;
    pageData.pageSize = 10;
    pageData.queryCriteria = props.hasDefaultParams ? (props.apiParams as object) : {};
    handleFetchTableList();
    emit('onFormReset');
  };

  watch(
    () => props.filterValue,
    (newValue) => {
      pageData.queryCriteria = newValue || {};
    },
    { immediate: true } // 开启首次监听
  );

  onMounted(() => {
    if (props.firstLoad) {
      handleFetchTableList();
    }
  });

  // 通过实例暴露子组件中的方法与属性
  defineExpose({
    fetchTableList: handleFetchTableList,
    queryCriteria: pageData.queryCriteria,
    tableState: pageData
  });
</script>



```