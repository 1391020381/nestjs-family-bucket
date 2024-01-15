
```
// BaseFrom使用
<template>
    <div>
     <BaseForm
      ref="baseFormRef"
      :schema="state.schema.concat(state.cardSchema)"
      :form-props="state.formProps"
      :form-value="state.formValue"
      @on-change="handleFormChange"
    />
    
    </div>
</template>

<script setup lang="ts">
 const state: INewUserTaskLeaderForm = reactive({
    schema: [
      {
        label: '兑奖名称',
        field: 'rulerName',
        component: 'a-input',
        required: true,
        placeholder: '请输入'
      },
      {
        label: '规则状态',
        field: 'rulerStatus',
        component: 'a-select',
        required: true,
        placeholder: '请选择',
        options: Object.keys(IRulerStatusCn).map((item: unknown) => {
          return { label: IRulerStatusCn[item as IRulerStatus], value: Number(item) };
        })
      },
      {
        label: '用户等级',
        field: 'userLevel',
        component: 'a-select',
        required: true,
        placeholder: '请选择',
        mode: 'multiple',
        options: getUserLevel(4)
      },
      {
        label: '在线时间',
        field: 'dateRange',
        component: 'a-range-picker',
        required: true,
        format: 'YYYY-MM-DD',
        disabledDate: (current: Dayjs) => {
          // Can not select days before today
          return current && current < dayjs().subtract(1, 'days');
        }
      }
    ],
    cardSchema: [
      {
        label: '奖品类型',
        field: 'awardType',
        component: 'a-select',
        required: true,
        placeholder: '请选择',
        options: HEAD.map((item) => ({ label: IAwardTypeCn[item], value: item }))
      },
      {
        label: '兑换所需金币',
        field: 'conditionAmount',
        component: 'a-input-number',
        required: true,
        placeholder: '请输入',
        min: 0
      },
      {
        label: '原价金币',
        field: 'originalConditionAmount',
        component: 'a-input-number',
        placeholder: '请输入'
      },
      {
        label: '奖池',
        field: 'awardPoolId',
        component: 'a-select',
        required: true,
        placeholder: '请选择'
      }
    ],
    formProps: {
      submitOnChange: false,
      isPriority: false,
      submitting: false,
      isReadonly: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    },
    formValue: {},
    awardPoolInfo: {}, // 具体的奖品池信息
    awardInfos: [], // 根据奖品类型显示的奖品池列表
    selectList: [], // 全部的奖品池列表
    isEditor: true
  });

const handleFormChange = ()=>{
    
}

</script>

```