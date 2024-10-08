# 在 Nest 里集成 TypeORM

- [实体管理器和数据仓库](https://www.typeorm.org/working-with-entity-manager)

# 什么事实体管理器

- 使用EntityManager，你可以管理(插入 更新 删除 加载等)任何实体。实体管理器就像是一个集合，将所有实体存储库集中在一个地方。

```
import { DataSource } from "typeorm"
import { User } from "./entity/User"

const myDataSource = new DataSource(/*...*/)
const user = await myDataSource.manager.findOneBy(User, {
    id: 1,
})
user.name = "Umed"
await myDataSource.manager.save(user)


```

# 什么是仓库

- Repository(存储库) 与 EntityManager类似，但其操作仅限与特定的实体。 可以通过实体管理器访问存储库。

```

import { User } from "./entity/User"

const userRepository = dataSource.getRepository(User)
const user = await userRepository.findOneBy({
    id: 1,
})
user.name = "Umed"
await userRepository.save(user)

```

- [查询项](https://www.typeorm.org/find-options)
- [实体管理器API](https://www.typeorm.org/entity-manager-api)
- [数据仓库API](https://www.typeorm.org/repository-api)

* 现在通过 TypeOrm.forRoot来传入的数据源的配置，通过@InjectEntityManager来注入的 entityManager对象。缺点用每个API都要带上 Entity

* Nest对这个做了封装，在user模块引入 TypeOrmModule.forFeature对应的动态模块,传入User的Entity nestjs官网

* 使用方式在根模块TypeOrmModule.forRoot传入数据配置。
* 然后就可以在各处注入DataSrource EntityManager来增删改查了。 this.dataSource.getRespository()
* 如果想用Repository来简化操作,还可以在用到模块引入TypeOrmModule.forFeature的动态模块,传入Entity，会返回对应的Reposity。
* 这样就可以在模块内注入该Repository来用了。

* 它的原理是TypeOrmModule.forRoot对应的动态模块是全局的，导出了dataSource entiryManager 所以才可以到处注入。
* 而TypeOrmModule.forEature则会根据把传入的Entity对应的Repository导出,这样就可以在模块内注入了。
* 这就是Nest里集成TypeOrm的方式和实现原理。

* [TypeORM Integration](https://docs.nestjs.com/techniques/database#typeorm-integration)
