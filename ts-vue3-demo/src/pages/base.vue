<template>
    ts-base
</template>
<script lang="ts" setup>
console.log('ts-base')
type MaybeNull<T> = T | null;
function process(input: MaybeNull<{ handler: () => {} }>) {
    input.handler()
}
process({})
</script>
<style scoped></style>