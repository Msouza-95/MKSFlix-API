import * as dotenv from 'dotenv';

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // Configurações do Swagger
  const config = new DocumentBuilder()
    .setTitle('Documentação da Api MkS Flix')
    .setDescription('Descrição da MkS Flix')
    .setVersion('1.0')
    .addTag('tags')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-documentation', app, document);

  await app.listen(3344);
}
bootstrap();
