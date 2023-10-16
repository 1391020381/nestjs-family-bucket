import { Injectable } from "@nestjs/common";

@Injectable()
export class ThirdService {
  useClass() {
    return "";
  }
  useFactory() {
    return "构造器给提供者2";
  }
}
