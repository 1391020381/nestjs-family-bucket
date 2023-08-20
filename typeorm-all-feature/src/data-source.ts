import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import {Aaa} from './entity/Aaa'
import { IdCard } from "./entity/IdCard"
import { Department } from "./entity/Department"
import { Employee } from "./entity/Employee"
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "practice",
    synchronize: true,
    logging: true,
    entities: [User,Aaa,IdCard,Department,Employee],
    // entities:['./entity/*.ts'],
    migrations: [],
    subscribers: [],
    connectorPackage:"mysql2",
    extra:{
        authPlugin:"sha256_password"
    }
})
