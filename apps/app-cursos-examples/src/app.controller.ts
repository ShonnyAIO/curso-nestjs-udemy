import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  getHello(): any {
    return "Hello World!";
  }
  constructor(private readonly appService: AppService) {}
}
