```
<template>
  <el-table :data="tableData">
    <el-table-column 
      v-for="(item, index) in columns" 
      :key="index" 
      :prop="item.prop" 
      :label="item.label"
    >
      <template v-for="slotName in slotNames(item.prop)" v-slot:[slotName]="scope">
        <slot :name="slotName" :row="scope.row"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
    
<script>
//...
methods: {
  slotNames(columnName) {
    return ['header-' + columnName, columnName]
  }
}
</script>




// 使用

<template>
  <MyTable :columns="columns" :data="data">
    <template v-slot:header-name="{ column }">
      自定义头部内容：{{ column.label }}
    </template>
    <template v-slot:name="{ row }">
      自定义列内容：{{ row.name }}
    </template>
  </MyTable>
</template>

<script>
// your script here
</script>

```