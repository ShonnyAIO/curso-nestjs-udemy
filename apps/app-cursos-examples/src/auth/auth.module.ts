import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/models/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtHandle } from './utils/jwt-handle/jwt-handle';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    /*
    JwtModule.register({
      signOptions: { expiresIn: '1d'},
      secret: process.env.JWT_SECRET
    }), */
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          signOptions: { expiresIn: '4d' },
          secret: process.env.JWT_SECRET,
        };
      },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ClientsModule.register([
      {
        name : 'MAIL_SERVICE', transport: Transport.TCP
      }
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtHandle],
  exports: [AuthService, JwtHandle],
})
export class AuthModule {}
