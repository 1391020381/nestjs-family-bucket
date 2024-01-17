<template>
  <button :class="{ [`${prefixName}-button`]: true }">
    <slot v-if="$slots.default"></slot>
    <!-- <div>测试pnpm模式 是否支持 引入方立即响应 组件改变</div> -->
  </button>
</template>

<script setup lang="ts">
import { prefixName } from '../theme/index';
</script>
