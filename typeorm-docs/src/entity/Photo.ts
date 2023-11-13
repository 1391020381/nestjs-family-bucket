import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PhotoMetadata } from "./PhotoMetadata";
import { User } from "./User";
import { Album } from "./Album";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column("text")
  description: string;

  @Column()
  filename: string;

  @Column("double")
  views: number;

  @Column()
  isPublished: boolean;

  @OneToOne((type) => PhotoMetadata, (photoMetadata) => photoMetadata.photo)
  metadata: PhotoMetadata;

  @ManyToOne((type) => User, (user) => user.photos)
  user: User;

  @ManyToMany((type) => Album, (album) => album.photos)
  albums: Album[];
}
