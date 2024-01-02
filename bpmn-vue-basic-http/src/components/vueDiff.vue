<template>
    <div>
        <ul>
            <li v-for="(item, index) in list" :key="index">
                {{ item }}
                <button @click="removeItem(index)">Remove</button>
            </li>
        </ul>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            list: [1, 2, 3],
        };
    },
    methods: {
        removeItem(index) {
            this.list.splice(index, 1);
        },
    },
};
</script>