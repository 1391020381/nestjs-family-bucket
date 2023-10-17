// src/modules/content/repositories/post.repository.ts
import { Repository } from "typeorm";
import { CustomRepository } from "@/modules/database/decorators";
import { PostEntity } from "../entities/post.entity";

@CustomRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  buildBaseQB() {
    return this.createQueryBuilder("post");
  }
}

// src/modules/content/repositories/index.ts
export * from "./post.repository";
