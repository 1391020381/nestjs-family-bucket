import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
@Injectable()
export class MyCronJobService {
  @Cron('0 0 * * * *', {
    name: 'my-cron-job',
  })
  async myCronJob() {
    console.log('myCronJob');
  }
}
