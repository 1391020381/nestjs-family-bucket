# SetMetadata Reflector

# reflect-metadata

```
Reflect.defineMetadata(metadataKey, metadataValue, target);

Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);


let result = Reflect.getMetadata(metadataKey, target);

let result = Reflect.getMetadata(metadataKey, target, propertyKey);


```

- Reflect.defineMetadata Reflect.getMetadata 分别用于设置和获取某个类的元数据,如果最后传入了属性名,还可以单独为某个属性设置元数据。

# 元数据存在哪

- 存在类或者对象上,如果给类或者类的静态属性添加元数据,那就保存在类上。
- 如果给实例属性添加元数据 那就保存在对象上,用类似 [[metadata]]的 key 来存的。

# Reflect.metadata 装饰器可以再封装一层

- Nest 的实现原理就是通过装饰器给 class 或者对象添加元数据,然后初始化的时候取出这些元数据,进行依赖分析,然后创建对应的实例对象就可以了。

* 只要开启了 ts emitDecoratorMetadata 编译选项,然后创建对象的时候就可以通过 design:paramttypes 来拿构造器参数的类型了。
