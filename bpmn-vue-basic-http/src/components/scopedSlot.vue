<template>
    <a :href="url">
        <slot :website="website">
            {{ website.subTitle }}
        </slot>
    </a>
</template>
<script>
export default {
    props: ['url'],
    data() {
        return {
            website: {
                url: "http://wangEditor.com/",
                title: "wangEditor",
                subTitle: "轻量富文本编辑器"
            }
        }
    }
}
</script>