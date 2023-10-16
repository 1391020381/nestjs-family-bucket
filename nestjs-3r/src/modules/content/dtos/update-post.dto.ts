import { Injectable } from "@nestjs/common";

import { PartialType } from "@nestjs/swagger";

import { CreatePostDto } from "./create-post.dto";
import { IsDefined, IsNumber } from "class-validator";

@Injectable()
export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsNumber(undefined, { groups: ["update"], message: "贴子ID格式错误" })
  @IsDefined({ groups: ["update"], message: "贴子ID必须指定" })
  id: number;
}
