import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS POLICY
  app.enableCors({
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
  });

  // GLOBAL PIPE
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // SWAGGER CONFIG
  const config = new DocumentBuilder()
    .setTitle('Items Example')
    .setDescription('Items API description')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(3000);
}

bootstrap();
