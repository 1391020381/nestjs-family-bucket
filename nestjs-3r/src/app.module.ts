import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ContentModule } from "./modules/content/content.module";
import { CoreModule } from "./modules/core/core.module";
import { DatabaseModule } from "./modules/database/database.module";
import { database } from "./config";
// import { ExampleModule } from "./modules/example/example.module";
@Module({
  imports: [
    ContentModule,
    CoreModule.forRoot(),
    DatabaseModule.forRoot(database),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
