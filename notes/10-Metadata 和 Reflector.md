```
Reflect.defineMetadata(metadataKey, metadataValue, target);

Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);


let result = Reflect.getMetadata(metadataKey, target);

let result = Reflect.getMetadata(metadataKey, target, propertyKey);


```

1. Reflect.defineMetadata
2. Reflect.getMetadata

- 分别用于设置和获取某个类的元数据，如果最后传入了属性名,还可以单独为某个属性设置元数据。

* 元数据存在类或者对象上。
* 如果给类或者类的静态属性添加元数据 那就保存在类上。
* 如果给实例属性添加元数据，那就保存在对象上,用类似[[metadata]]的key来保存的。

* 支持装饰器的方式使用

```
@Reflect.metadata(metadataKey, metadataValue)
class C {

  @Reflect.metadata(metadataKey, metadataValue)
  method() {
  }
}



function Type(type) {
    return Reflect.metadata("design:type", type);
}
function ParamTypes(...types) {
    return Reflect.metadata("design:paramtypes", types);
}
function ReturnType(type) {
    return Reflect.metadata("design:returntype", type);
}

@ParamTypes(String, Number)
class Guang {
  constructor(text, i) {
  }

  @Type(String)
  get name() { return "text"; }

  @Type(Function)
  @ParamTypes(Number, Number)
  @ReturnType(Number)
  add(x, y) {
    return x + y;
  }
}



let obj = new Guang("a", 1);

let paramTypes = Reflect.getMetadata("design:paramtypes", obj, "add");
// [Number, Number]


```

- Nest的实现原理就是通过装饰器给class或者对象添加元数据,然后初始化的时候取出这些数据,进行依赖分析,然后创建对应实例对象。

* reflect-metadata

* TS支持编译时自动添加一些 metadata数据
* design:type
* design:paramstypes
* design:returntype
