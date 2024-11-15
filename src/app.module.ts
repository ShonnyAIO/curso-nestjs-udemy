import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { VideosModule } from './videos/videos.module';
import { AwardsModule } from './awards/awards.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmailModule } from './event-email/event-email.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailModule } from './mail/mail.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CoursesModule,
    AuthModule,
    VideosModule,
    AwardsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.DB_URI, {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-delete'), {
          overrideMethods: 'all',
        });
        return connection;
      },
    }),
    CacheModule.register({
      ttl: 3600,
      max: 1000,
      isGlobal: true,
    }),
    UsersModule,
    EventEmailModule,
    EventEmitterModule.forRoot(),
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
