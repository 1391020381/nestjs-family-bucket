```

import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456",
  database: "typeorm-docs",
  synchronize: true,
  logging: true,
  // entities: [User],
  entities: ["src/entity/**/*.ts"],
  migrations: [],
  subscribers: [],
  connectorPackage: "mysql2",
  extra: {
    authPlugin: "sha256_password",
  },
});


```

- 注意 要配置 connectorPackage 和 extra

1. 使用 Entity Manager connection.manager.find(Photo)
2. 使用 Repositories let photoRepository = connection.getRepository(Photo);await photoRepository.save(photo)
3. 关系可以是单向的或双向的。@OneToOne @JoinColumn
4. 我嘛应该仅仅在关系的一侧使用 @JoinColumn装饰器。你把这个装饰器放在哪一方将是这段关系的拥有方。 关系的拥有方包含数据库中具有外健的列。

- 在多对一 一对多的关系中 拥有方总是 多对一的。 这意味着使用 @ManyToOne的类存储相关对象的id.

# 多个连接 数据库 模式和主从复制设置
