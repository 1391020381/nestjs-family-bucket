import { connect } from "http2";
import { AppDataSource } from "./data-source";
import { Photo } from "./entity/Photo";
import { User } from "./entity/User";
import { PhotoMetadata } from "./entity/PhotoMetadata";

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
    console.log("change!!!!!!!!------");

    // Photo
    let photo = new Photo();
    photo.name = "Me and Bears";
    photo.description = "I am near polar bears";
    photo.filename = "photo-with-bears-jpg";
    photo.views = 1;
    photo.isPublished = true;
    await AppDataSource.manager.save(photo);
    let savedPhotos = await AppDataSource.manager.find(Photo);
    console.log("savedPhotos:", savedPhotos);

    //  一对一关系

    let photoReltation = new Photo();
    photo.name = "Me and Bears Reltation";
    photo.description = "I am near polar bear";
    photo.filename = "photo-with-bears.jpg Reltation";
    photo.isPublished = true;

    let metadata = new PhotoMetadata();
    metadata.height = 640;
    metadata.width = 480;
    metadata.compressed = true;
    metadata.comment = "cybershoot";
    metadata.orientation = "portait";
    metadata.photo = photo;

    let photoRepository = AppDataSource.manager.connection.getRepository(Photo);
    let metadataRepository =
      AppDataSource.manager.connection.getRepository(PhotoMetadata);

    await photoRepository.save(photo);
    await metadataRepository.save(metadata);

    console.log(
      "Metadata is saved, and relation between metadata and photo is created in the database too"
    );
    // 取出关联对象
    let photos = await photoRepository.find({ relations: ["metadata"] });
    console.log("photos:", photos);
  })
  .catch((error) => console.log(error));
