import { Module } from "@nestjs/common";
import { PostController } from "./controllers/index";
import { PostService } from "./services/post.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "./entities/post.entity";
import { DatabaseModule } from "../database/database.module";
import { PostSubscriber } from "./subscribers";
import { PostRepository } from "./repositories";
import { SanitizeService } from "./services";
@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    DatabaseModule.forRepository([PostRepository]),
  ],
  controllers: [PostController],
  providers: [PostService, PostSubscriber, SanitizeService],
  exports: [PostService, DatabaseModule.forRepository([PostRepository])],
})
export class ContentModule {}
