import { Album } from "../entity/Album";
import { Photo } from "../entity/Photo";

export const getOneToOneData = async (connection) => {
  let photoResposity = connection.getRepository(Photo);
  let photos = await photoResposity.find({ relations: ["metadata"] });
  console.log(
    "getOneToOneData:",
    photos,
    "photos[0]",
    photos[0],
    "photos[0].name:",
    photos[0].name,
    "photos[0].description:",
    photos[0].description
  );
};

export const handleManyToMany = async (connection) => {
  let album1 = new Album();
  album1.name = "Bears";
  await connection.manager.save(album1);

  let album2 = new Album();

  album2.name = "Me";
  await connection.manager.save(album2);

  let photo = new Photo();

  photo.name = "Me and Bears";
  photo.description = "I am near polar bears";
  photo.filename = "photo-width-bears.jpg";
  photo.views = 6;
  photo.isPublished = true;
  photo.albums = [album1, album2];
  await connection.manager.save(photo);

  const loadedPhoto = await connection
    .getRepository(Photo)
    .find({ where: { id: 17 }, relations: ["albums"] });
  let albumsData = loadedPhoto[0].albums;
  console.log("loadedPhoto:", loadedPhoto, "albumsData:", albumsData);
};
