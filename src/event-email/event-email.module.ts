import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserDocument } from 'src/users/models/users.schema';

@Module({})
export class EventEmailModule {

    @OnEvent('user.login')
    handleUserLoginEvent(user: any){
        console.log('__INICIO_SESION__', user);
        // Enviar email
    }

    @OnEvent('user.created')
    handleUserCreatedEvent(payload: UserDocument){
        console.log('___EVENT_USER__', payload);
        // Enviar email
    }
}
