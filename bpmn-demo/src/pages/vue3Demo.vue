<template>
    <div>{{ ageRef }}</div>
    <div>{{ obj.a }}---{{ obj.b }}</div>
    <div>
        <button @click="changAge">change age</button>
        <button @click="changObj">change obj</button>
    </div>
    <div>
        <div>{{ nestObj.c.d }}</div>
        <div>{{ nestObjRef.c.e }}</div>
    </div>
    <div>
        <button @click="changeNestObj">changeNestObj</button>
    </div>
    <div>
        {{ eRef }}
    </div>
</template>
<script setup lang="ts">
import { ref, toRef, reactive } from 'vue'
const ageRef = ref(20)
const obj = reactive({ a: 1, b: 2 })
const nestObj = reactive({ c: { d: 1, e: 2 }, f: 5 })
const nestObjRef = ref({ c: { d: 1, e: 2 } })
const eRef = toRef(nestObj, 'f')
const changAge = () => {
    ageRef.value = ageRef.value + 1
}
const changObj = () => {
    obj.a = obj.a + 2
    obj.b = obj.b + 3
}
const changeNestObj = () => {
    nestObj.c.d = nestObj.c.d + 1;
    nestObjRef.value.c.e = nestObjRef.value.c.e + 1;
}
</script>