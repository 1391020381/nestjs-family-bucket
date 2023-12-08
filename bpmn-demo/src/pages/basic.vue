<template>
    <div class="containers">
        <div class="canvas" ref="canvas" id="canvas"></div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import xmlStr from '../mock/xmlStr';
let bpmnModeler = ref(null)
let container = ref('')
let canvas = ref(null)

onMounted(() => {
    init()
})
const init = () => {
    (bpmnModeler as any) = new BpmnModeler({
        // container: document.getElementById('canvas') || '' // canvas as any
        container: canvas.value as any
    })
    createNewDiagram()
}
const createNewDiagram = async () => {
    try {
        const { warnings } = await bpmnModeler.importXML(xmlStr)
        console.log('warnings:', warnings)
    } catch (error) {
        console.log('error:', error)
    }
}
</script>
<style scoped>
.containers {
    position: absolute;
    left: 0;
    top: 0;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
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
