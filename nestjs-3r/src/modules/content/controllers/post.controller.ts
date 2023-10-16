import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  ValidationPipe,
  ParseIntPipe,
} from "@nestjs/common";
import { PostService } from "../services/post.service";

import { CreatePostDto } from "../dtos/create-post.dto";
import { UpdatePostDto } from "../dtos/update-post.dto";

@Controller("post")
export class PostController {
  constructor(private postService: PostService) {}
  @Get()
  async index() {
    return this.postService.findAll();
  }
  @Get(":id")
  async show(@Param("id") id: number) {
    return this.postService.findOne(id);
  }
  @Post()
  async store(
    @Body(
      new ValidationPipe({
        transform: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        validationError: { target: false },
        groups: ["create"],
      })
    )
    data: CreatePostDto
  ) {
    return this.postService.create(data);
  }
  @Patch()
  async update(
    @Body(
      new ValidationPipe({
        transform: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        validationError: { target: false },
        groups: ["update"],
      })
    )
    data: UpdatePostDto
  ) {
    return this.postService.update(data);
  }

  @Delete(":id")
  async delete(@Param("id", new ParseIntPipe()) id: number) {
    return this.postService.delete(id);
  }
}
