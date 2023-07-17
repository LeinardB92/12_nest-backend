import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // La siguiente línea resuelve el problema de CORS que suceda cuando se intenta hacer una petición desde un puerto diferente.
  app.enableCors();

  app.useGlobalPipes( 
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
   );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
