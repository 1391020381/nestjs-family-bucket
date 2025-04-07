import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
const mockProvider = {
  create: () => {
    return {
      id: 1,
      name: 'mock',
    };
  },
};
export const Connection = {
  getRepository: (id?: string) => {
    return {
      find: () => {
        return [
          {
            id: id || 1,
            name: 'mock',
          },
        ];
      },
    };
  },
};
@Module({
  controllers: [ProviderController],
  providers: [
    // ProviderService,
    {
      provide: ProviderService,
      useValue: mockProvider,
    },
    {
      provide: 'CONNECTION',
      useValue: Connection,
    },
  ],
})
export class ProviderModule {}
