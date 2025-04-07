import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';

@Module({
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule {}

/**
 * 模块默认会对提供者进行封装,这意味着你只能注入属于当前模块的提供者
 * 或是从其他已导入模块显示导出的提供者
 * 模块导出的提供者实质上充当了该模块的公共接口或API
 */
