# Nestjs整合Typeorm实现基本的CRUD操作及分页数据查询

- 动态模块 如果要在模块导入时传入参数,则需要定义动态模块,动态模块同样可以利用global属性设置为全局模块

1. 创建core module

```
// src/modules/core/core.module.ts

@Module({})
export class CoreModule{
    static forRoot(): DynamicModule{
        return {
            module:CoreModule,
            global:true,
            provider:[],
            exports:[]
        }
    }
}

// src/main.ts

@Module({
    imports:[CoreModule.forRoot()]
})
export class AppModule{}
```

2. 数据库模块 动态模块

```
@Module({})
export class DatabaseModule {
    static forRoot(configRegister:()=> TypeOrmModuleOptions):DynamicModule{
        return {
            global:true,
            module: DatabaseModule,
            imports:[TypeOrmModule.forRoot(configRegister())]
        }
    }
}

// src/app.module.ts

@Module({
    imports:[
        DatabaseModule.forRoot(database)
    ]
})
export class AppModule{}
```

3. 自定义Repository

```
// src/modules/database/constants.ts
export const CUSTOM_REPOSITORY_METADATA = 'CUSTOM_REPOSITORY_METADATA';

// src/modules/database/database.module.ts


@Module({})
export class DatabaseModule {
    static forRoot(configRegister:()=> TypeOrmModuleOptions):DynamicModule{
        return {
            global:true,
            module: DatabaseModule,
            imports:[TypeOrmModule.forRoot(configRegister())]
        }
    }
    static forRepository<T extends Type<any>>(repositories:T[],dataSourceName?:string):DynamicModule{
        const providers:Provider[] = []
        for ( const Repo of repositories){
            const entity = Reflect.getMetadata(CUSTOM_REPOSITORY_METADATA, Repo);

            if (!entity) {
                continue;
            }
             providers.push({
                inject: [getDataSourceToken(dataSourceName)],
                provide: Repo,
                useFactory: (dataSource: DataSource): InstanceType<typeof Repo> => {
                    const base = dataSource.getRepository<ObjectType<any>>(entity);
                    return new Repo(base.target, base.manager, base.queryRunner);
                },
            });
        }

        return {
            exports: providers,
            module: DatabaseModule,
            providers,
        };
        }
    }
}

```

4. 内容模块
1. 常量
1. 模型 // src/modules/content/entities/post.entity.ts
1. Repostitory

```
// src/modules/content/repositories/post.repository.ts

@CustomRepository(PostEntity)
export class PostRepository extends Repository<PostEntity>{
    buildBaseQB(){
        return this.createQueryBuilder('post')
    }
}

```

5. 防注入处理
6. 订阅者
7. 服务者
8. 控制器
9. 模块编写 module 注入

- 使用 TypeOrmModule.forRoot 方法注册了一个名为 default 的数据源。我们可以使用 getDataSourceToken('default') 方法来获取这个数据源的 token，以便在其他地方注入数据源实例。

* 当 getDataSourceToken 方法的参数为 undefined 或者未传递参数时，它会返回默认数据源的 token。默认数据源是在使用 TypeOrmModule.forRoot 方法时配置的第一个数据源。
* 使用 TypeORM 时，我们可以通过数据源实例的 getRepository 方法获取一个实体的存储库。这个方法的作用是获取一个与实体相关的存储库实例，以便在应用程序中进行数据库操作。

```

import { Controller, Get } from '@nestjs/common';
import { Connection } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { User } from './user.entity';

@Controller()
export class AppController {
  constructor(private readonly connection: Connection) {}

  @Get()
  async getData(): Promise<any[]> {
    const repository = this.connection.getRepository<User>(User);
    const result = await repository.find();
    return result;
  }
}

```

- 在这个例子中，我们使用 getRepository 方法获取了 User 实体的存储库。存储库是 TypeORM 中的一个核心概念，它提供了一组方法来进行数据库操作，包括查询、插入、更新和删除等操作。

获取存储库时，我们需要传递一个实体作为参数。在这个例子中，我们传递了 User 实体。这样，我们就可以使用存储库的方法来查询数据库了。

需要注意的是，我们可以通过数据源实例的 getRepository 方法获取任何一个实体的存储库，而不仅仅是在控制器中获取。

- 在使用 TypeORM 时，我们可以通过数据源实例的 getRepository 方法获取一个实体的存储库。但是，有时候我们需要对存储库进行扩展，以添加一些自定义的方法或属性。在这种情况下，我们可以通过继承存储库的方式来实现。

例如，以下代码中的 Repo 类继承了 getRepository 方法返回的存储库实例，并添加了一个自定义的 customMethod 方法：

```

import { ObjectType, Repository } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

class Repo<Entity> extends Repository<Entity> {
  customMethod(): string {
    return 'Custom method';
  }
}

export class MyService {
  private repository: Repo<any>;

  constructor(private connection: Connection) {
    const entity = 'MyEntity';
    const base = this.connection.getRepository<ObjectType<any>>(entity);
    this.repository = new Repo(base.target, base.manager, base.queryRunner);
  }

  async getData(): Promise<any[]> {
    const result = await this.repository.find();
    return result;
  }

  customMethod(): string {
    return this.repository.customMethod();
  }
}


```

- 在这个例子中，我们首先使用 getRepository 方法获取了一个实体的存储库。然后，我们使用这个存储库实例创建了一个自定义的 Repo 类的实例。在 Repo 类中，我们添加了一个自定义的 customMethod 方法。

在 MyService 类中，我们使用 Repo 类的实例来进行数据库操作，并调用了自定义的 customMethod 方法。这样，我们就可以在存储库中添加自定义的方法或属性了。

需要注意的是，我们需要在调用 getRepository 方法时传递实体作为参数，以便获取正确的存储库实例。在这个例子中，我们传递了 MyEntity 实体。
