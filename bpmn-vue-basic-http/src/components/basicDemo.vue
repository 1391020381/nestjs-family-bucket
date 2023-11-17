<template>
    <div class="containers">
        <div class="canvas" ref="canvas"></div>
    </div>
</template>
  
<script>
import BpmnViewer from 'bpmn-js';
import xmlStr from '../mock/xmlStr'
export default {
    name: '',
    components: {},
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    // 生命周期 - 载入后, Vue 实例挂载到实际的 DOM 操作完成，一般在该过程进行 Ajax 交互
    mounted() {

    },
    data() {
        return {
            bpmnModeler: null,
            container: null,
            canvas: null
        }
    },
    // 方法集合
    methods: {
        init() {
            const canvas = this.$refs.canvas
            this.bpmnModeler = new BpmnViewer
                ({ container: canvas })
            this.createNewDiagram()
        },
        createNewDiagram() {
            this.bpmnModeler.importXML(xmlStr, err => {
                if (err) {
                    console.log(err)
                } else {
                    this.success()
                }
            })
        },
        success() {
            console.log('创建成功')
        }
    },
    // 计算属性
    computed: {}
}
</script>
  
<style scoped>
.containers {
    background-color: #ffffff;
    width: 100%;
    height: calc(100vh - 52px);
}

.canvas {
    width: 100%;
    height: 100%;
}

.panel {
    position: absolute;
    right: 0;
    top: 0;
    width: 300px;
}
</style>