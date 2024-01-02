<template>
    <div>
        <ul>
            <li v-for="item in list" :key="item.id">
                {{ item.name }}
                <button @click="removeItem(item)">Remove</button>
            </li>
        </ul>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            list: [
                { id: 1, name: "John" },
                { id: 2, name: "Mary" },
                { id: 3, name: "Tom" },
            ],
        };
    },
    methods: {
        removeItem(item) {
            const index = this.list.indexOf(item);
            this.list.splice(index, 1);
        },
    },
};
</script>