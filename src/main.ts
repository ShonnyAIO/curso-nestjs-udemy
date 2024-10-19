import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });

  app.use(json({ limit : '60mb'}));

  app.enableVersioning({
    defaultVersion: '1',
    type : VersioningType.URI
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Curso NestJS Leifer Mendez | Cursos')
    .setDescription('Esta es la API del Curso')
    .addTag('courses')
    .addTag('videos')
    .addTag('awards')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  console.log('__ENV__', process.env.PORT);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
