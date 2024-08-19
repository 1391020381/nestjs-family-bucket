import { In, QueryBuilder } from "typeorm";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)
    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)
    // console.log("Here you can setup and run express / fastify / any other framework.")
    // await AppDataSource.manager.save(User, [
    //   { id: 1, firstName: "ccc", lastName: "ccc333", age: 21 },
    //   { id: 2, firstName: "ddd", lastName: "ddd333", age: 22 },
    //   { id: 3, firstName: "eee", lastName: "eee333", age: 23 },
    // ]);
    // await AppDataSource.manager.delete(User, [1, 2, 3, 4, 5]);
    // await AppDataSource.manager.save(User, [
    //   { firstName: "ccc", lastName: "ccc", age: 21 },
    //   { firstName: "ddd", lastName: "ddd", age: 22 },
    //   { firstName: "eee", lastName: "eee", age: 23 },
    // ]);
    // const users = await AppDataSource.manager.find(User);
    // console.log(users);
    // const users = await AppDataSource.manager.findBy(User, { age: 23 });
    // console.log(users);
    // const [users, count] = await AppDataSource.manager.findAndCount(User);
    // console.log(users, count);
    // const [users, count] = await AppDataSource.manager.findAndCountBy(User, {
    //   age: 23,
    // });
    // console.log(users, count);
    // const user = await AppDataSource.manager.findOne(User, {
    //   select: {
    //     firstName: true,
    //     age: true,
    //   },
    //   where: {
    //     id: 6,
    //   },
    //   order: {
    //     age: "ASC",
    //   },
    // });
    // console.log(user);
    // const users = await AppDataSource.manager.find(User, {
    //   select: {
    //     firstName: true,
    //     age: true,
    //   },
    //   where: {
    //     id: In([6, 8]),
    //   },
    //   order: {
    //     age: "ASC",
    //   },
    // });
    // console.log("users:", users);
    // const queryBuilder = await AppDataSource.manager.createQueryBuilder();
    // const user = await queryBuilder
    //   .select("user")
    //   .from(User, "user")
    //   .where("user.age = :age", { age: 21 })
    //   .getOne();
    // console.log("user:", user);
    // 连表查询
    // 事务
  })
  .catch((error) => console.log(error));
