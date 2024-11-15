import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserDocument } from 'src/users/models/users.schema';

@Module({})
export class EventEmailModule {
  constructor(private readonly mailService: MailerService) {}

  @OnEvent('user.login')
  handleUserLoginEvent(user: any) {
    console.log('__INICIO_SESION__', user);
    // Enviar email
  }

  @OnEvent('user.created')
  handleUserCreatedEvent(user: UserDocument) {
    console.log('___EVENT_USER__', user);
    this.mailService.sendMail({
      to: user.email,
      template: 'welcome',
      subject: 'Bienvenido a la APP NestJS',
      context: {
        name: user.name,
      },
    });
    // Enviar email
  }
}
