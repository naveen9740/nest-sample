import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as fs from 'fs';
var morgan = require('morgan');
var path = require('path');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  const config = new DocumentBuilder()
    .setTitle('Api Modernization')
    .setDescription('sample description')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  const accessLogStream = fs.createWriteStream(path.join('./', 'logs.log'), {
    flags: 'a',
  });
  app.use(morgan('combined', { stream: accessLogStream }));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();
