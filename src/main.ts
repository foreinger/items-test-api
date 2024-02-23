import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomValidationPipe } from './core/pipes/validation.pipe';
import * as morgan from 'morgan';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // INIT LOGGER
  app.use(morgan('tiny'));

  // CORS POLICY
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // GLOBAL PIPES
  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // SWAGGER CONFIG
  const config = new DocumentBuilder().setTitle('Items Example').setDescription('Items API description').setVersion('1.0.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3020, '127.0.0.1');
  Logger.log(`Listening at ${await app.getUrl()}/api`);
}

bootstrap();
