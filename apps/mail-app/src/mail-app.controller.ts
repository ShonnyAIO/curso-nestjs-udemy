import { Controller, Get } from '@nestjs/common';
import { MailAppService } from './mail-app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class MailAppController {
  constructor(private readonly mailAppService: MailAppService) {}

  @MessagePattern('user.created')
  getMessageUser(data: any){
    console.log('__ESTO_ES_EL_MICROSERVICIO_', data);
  }
}
