import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456",
  database: "migration-test",
  // synchronize: true,
  logging: true,
  entities: [User],
  migrations: ["./migration/**.ts"],
  subscribers: [],
  connectorPackage: "mysql2",
  extra: {
    authPlugin: "sha256_password",
  },
});
