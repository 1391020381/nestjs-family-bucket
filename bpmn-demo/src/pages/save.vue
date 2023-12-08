
<template>
    <div class="containers">
        <div class="loading" v-if="loading">
            Loading...
        </div>
        <template v-else>
            <div class="canvas" ref="canvas"></div>
            <div id="js-properties-panel" class="panel"></div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, onMounted } from "vue"
import BpmnModeler from "bpmn-js/lib/Modeler"
import {
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
} from 'bpmn-js-properties-panel';
import axios from 'axios'
import xmlStr from '../mock/xmlStr'
let bpmnModeler = ref(null)
let container = ref(null)
let canvas = ref(null)
let loading = ref(true)
let xmlUrl = ref('')
let defaultXmlStr = ref(xmlStr)
onMounted(() => {
    init()
})
const init = async () => {
    loading.value = true;
    xmlUrl.value = await getXmlUrl() as string
    console.log(xmlUrl)
    loading.value = false;
    nextTick(() => {
        initBpmn()
    })
}
const getXmlUrl = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            const url: string = 'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmnMock.bpmn' // 模拟网络请求的一个地址
            resolve(url)
        }, 1000)
    })
}
const initBpmn = () => {
    (bpmnModeler as any) = new BpmnModeler({
        container: canvas.value || '',
        propertiesPanel: {
            parent: '#js-properties-panel'
        },
        additionalModules: [
            BpmnPropertiesPanelModule,
            BpmnPropertiesProviderModule
        ]
    })
    createNewDiagram()
}
const createNewDiagram = async () => {
    let bpmnXmlStr = "";
    if (xmlUrl.value === '') {
        bpmnXmlStr = defaultXmlStr.value
        transformCanvas(bpmnXmlStr)
    } else {
        let res = await await axios({
            method: 'get',
            timeout: 120000,
            url: xmlUrl.value,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        console.log('res:', res)
        bpmnXmlStr = res.data
        transformCanvas(bpmnXmlStr)
    }
}
const transformCanvas = async (bpmnXmlStr) => {
    try {
        const { warnings } = await bpmnModeler.importXML(xmlStr)
        console.log('warnings:', warnings)
        initSuccess()
        let canvas = bpmnModeler.get('canvas')
        canvas.zoom('fit-viewport')
    } catch (error) {
        console.log('error:', error)
    }
}
const initSuccess = () => {
    addBpmnListener()
}
const addBpmnListener = () => {
    bpmnModeler.on('commandStack.changed', () => {
        saveDiagram((err, xml) => {
            console.log('saveDiagram', err, xml)
        })
    })
}
const saveDiagram = async (done) => {
    try {
        const { xml } = await bpmnModeler.saveXML({ format: true })
        done('', xml)
    } catch (err) {
        console.log(err)
        done(err, '')
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