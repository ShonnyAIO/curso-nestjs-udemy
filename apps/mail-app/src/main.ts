import { NestFactory } from '@nestjs/core';
import { MailAppModule } from './mail-app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
/**
 * Esta es nuestra App Mail
 */
async function bootstrap() {
  // const app = await NestFactory.create(MailAppModule);
  // await app.listen(3000);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MailAppModule,
    {
      transport: Transport.TCP
    },
  );
  await app.listen();
}
bootstrap();
