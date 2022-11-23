import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log(
      `mongodb://${process.env['mongo_user']}:${process.env['mongo_pass']}@localhost:27018/${process.env['mongo_database']}`,
    );
    return this.appService.getHello();
  }
}
