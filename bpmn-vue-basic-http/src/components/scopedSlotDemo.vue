<template>
    <div>
        <scopedSlot :url="website.url">
            <template v-slot="slotProps">
                {{ slotProps.website.title }}
            </template>
        </scopedSlot>
    </div>
</template>
<script>
import scopedSlot from "./scopedSlot.vue"
export default {
    components: {
        scopedSlot
    },
    data() {
        return {
            website: {
                url: "http://wangEditor.com/-----------",
                title: "wangEditor--------",
                subTitle: "轻量富文本编辑器--------------"
            }
        }
    }
}
</script>