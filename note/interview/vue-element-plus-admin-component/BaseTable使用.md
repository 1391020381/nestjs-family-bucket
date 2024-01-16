```
<template>
  <div class="case-setting-page">
    <BaseTable
      go-path="/newUserTask/memberList/form"
      :has-default-params="true"
      :columns="columns"
      :filter-schema="state.filterSchema"
      :filter-value="state.filterValue"
      :api-params="defaultParams"
      :fetch-api="(IntegralConfig.pointExchangeList as any)"
      @on-refresh="getRefreshList"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'rulerStatus'">
          <div>
            <span :style="getStatusColor(record.rulerStatus)">
              {{ RuleStatusCn[record.rulerStatus as RuleStatus] }}
            </span>
          </div>
        </template>
        <template v-if="column.dataIndex === 'pointExchangeAwardSettingInfoList'">
          <div>
            <div v-for="awardInfo in record.pointExchangeAwardSettingInfoList" :Key="awardInfo.id">
              <a-button
                type="link"
                @click="handleGo2PoolDetail({ appId: awardInfo.appId, poolId: awardInfo.awardPoolId })"
              >
                {{ awardInfo.awardPoolId }}
              </a-button>
            </div>
          </div>
        </template>
        <template v-if="column.dataIndex === 'awardType'">
          <div>
            <span
              style="display: block"
              v-for="awardInfo in record.pointExchangeAwardSettingInfoList"
              :Key="awardInfo.id"
            >
              {{ handleAwardType(+awardInfo.awardType) }}
            </span>
          </div>
        </template>
        <template v-if="column.dataIndex === 'userLevel'">
          <div v-for="level in record.userLevel?.split(',')" :Key="level">
            <span>{{ handleUserLevel(level) }}</span>
          </div>
        </template>
        <template v-if="column.dataIndex === 'option'">
          <a-space>
            <a-button type="link" @click="handleGo2Detail(record)">查看详情</a-button>
            <a-button type="link" @click="handleEdit(record)">编辑</a-button>
            <a-button
              :type="record.rulerStatus == 2 ? 'primary' : 'danger'"
              shape="round"
              @click="handleRuleStatus(record)"
            >
              {{ record.rulerStatus == 2 ? '启用' : '禁用' }}
            </a-button>
          </a-space>
        </template>
      </template>
    </BaseTable>
  </div>
</template>
<script setup lang="ts">
 const columns = ref([
    {
      title: '序号',
      dataIndex: 'id'
    },
    {
      title: '用户等级',
      dataIndex: 'userLevel'
    },
    {
      title: '规则状态',
      dataIndex: 'rulerStatus'
    },
    {
      title: '规则名称',
      dataIndex: 'rulerName'
    },
    {
      title: '生效时间',
      dataIndex: 'startDate',
      // @ts-ignore
      customRender: ({ record }) => `${record.startDate} - ${record.endDate}`
    },
    {
      title: '奖品类型',
      dataIndex: 'awardType'
    },
    {
      title: '关联奖池',
      dataIndex: 'pointExchangeAwardSettingInfoList'
    },
    {
      title: '优先体验',
      dataIndex: 'isPriority',
      // @ts-ignore
      customRender: ({ text }) => `${'' + text == 'false' ? '否' : '是'}`
    },
    {
      title: '查看详情',
      dataIndex: 'option',
      fixed: 'right'
    }
  ]);

</scipt>

```