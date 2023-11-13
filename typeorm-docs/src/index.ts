import { connect } from "http2";
import { AppDataSource } from "./data-source";
import { Photo } from "./entity/Photo";
import { User } from "./entity/User";
import { PhotoMetadata } from "./entity/PhotoMetadata";
import { getOneToOneData, handleManyToMany } from "./testFn/index";
AppDataSource.initialize()
  .then(async () => {
    const connection = AppDataSource.manager.connection;
    // getOneToOneData(connection);
    handleManyToMany(connection);
  })
  .catch((error) => console.log(error));
