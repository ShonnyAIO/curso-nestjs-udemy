import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/models/users.schema';
import { JwtModule } from '@nestjs/jwt';

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
          signOptions: { expiresIn: '1d'},
          secret: process.env.JWT_SECRET
        }
      }
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema}
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
