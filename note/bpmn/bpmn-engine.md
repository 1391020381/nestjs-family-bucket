# addSource({sourceContext})

```
const BpmnModdle = require('bpmn-moddle');
const elements = require('bpmn-elements');
const {Engine} = require('bpmn-engine');
const {EventEmitter} = require('events');
const {default: serializer, TypeResolver} = require('moddle-context-serializer');

const engine = new Engine({
  name: 'add source',
});

(async function IIFE(source) {
  const sourceContext = await getContext(source);
  engine.addSource({
    sourceContext,
  });

  const listener = new EventEmitter();
  listener.once('activity.wait', (api) => {
    console.log(api.name, 'is waiting');
    api.signal();
  });

  await engine.execute({
    listener
  });

  await engine.waitFor('end');
})(`
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <process id="theProcess" isExecutable="true">
    <startEvent id="start" />
    <sequenceFlow id="flow1" sourceRef="start" targetRef="task" />
    <userTask id="task" name="lazy source user" />
    <sequenceFlow id="flow2" sourceRef="task" targetRef="end" />
    <endEvent id="end" />
  </process>
</definitions>
`);

async function getContext(source, options = {}) {
  const moddleContext = await getModdleContext(source, options);

  if (moddleContext.warnings) {
    moddleContext.warnings.forEach(({error, message, element, property}) => {
      if (error) return console.error(message);
      console.error(`<${element.id}> ${property}:`, message);
    });
  }

  const types = TypeResolver({
    ...elements,
    ...options.elements,
  });

  return serializer(moddleContext, types, options.extendFn);
}

function getModdleContext(source, options) {
  const bpmnModdle = new BpmnModdle(options);
  return bpmnModdle.fromXML(source);
}

```

- addSource的作用

* 上面的代码只是 定义了名称 没有传入 source
* `Engine.addSource()`是bpmn-engine模块中的一个方法，用于将BPMN 2.0流程定义添加到执行引擎中，以便执行该流程。该方法接受一个对象作为参数，该对象包含以下属性：

- `name`：流程名称。
- `source`：BPMN 2.0流程定义的字符串形式。
- `moddleContext`：BPMN 2.0流程定义的JavaScript对象形式。
- `moddleOptions`：用于解析BPMN 2.0流程定义的选项。

在这个方法中，可以将BPMN 2.0流程定义作为字符串或JavaScript对象传递。如果传递的是一个字符串，则该方法将使用`bpmn-moddle`模块将其解析为JavaScript对象。如果传递的是一个JavaScript对象，则可以直接将其传递给该方法。

在执行引擎中添加BPMN 2.0流程定义后，可以使用`Engine.execute()`方法来执行该流程。在执行期间，可以使用事件监听器来监听各种事件，以便在需要时执行特定的操作。

## getContext

```

async function getContext(source, options = {}) {
  const moddleContext = await getModdleContext(source, options);

  if (moddleContext.warnings) {
    moddleContext.warnings.forEach(({error, message, element, property}) => {
      if (error) return console.error(message);
      console.error(`<${element.id}> ${property}:`, message);
    });
  }

  const types = TypeResolver({
    ...elements,
    ...options.elements,
  });

  return serializer(moddleContext, types, options.extendFn);
}

function getModdleContext(source, options) {
  const bpmnModdle = new BpmnModdle(options);
  return bpmnModdle.fromXML(source);
}

```

- `getContext`是一个用于获取流程上下文的函数。在这个例子中，`getContext`函数接受一个BPMN 2.0流程定义的字符串形式作为参数，然后使用`bpmn-moddle`模块将其解析为JavaScript对象。该函数还接受一个可选的`options`参数，该参数可以包含以下属性：

* `elements`：用于覆盖默认的BPMN元素实现的对象。
* `extendFn`：用于扩展BPMN元素实现的函数。

然后，该函数使用`moddle-context-serializer`模块将BPMN 2.0 JavaScript对象序列化为BPMN 2.0 XML，并返回一个包含流程上下文的对象。该对象包含以下属性：

- `name`：流程名称。
- `source`：BPMN 2.0流程定义的字符串形式。
- `moddleContext`：BPMN 2.0流程定义的JavaScript对象形式。
- `typeResolver`：用于解析BPMN元素类型的对象。
- `serializer`：用于将BPMN 2.0 JavaScript对象序列化为BPMN 2.0 XML的函数。

在这个例子中，`getContext`函数的返回值被用于将BPMN 2.0流程定义添加到执行引擎中。
