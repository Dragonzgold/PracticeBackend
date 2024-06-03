import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v1");

  app.useGlobalPipes(
    //Se importa el ValidationPipe
    new ValidationPipe({
      //Con esto nos aseguramos de que no nos pasen mas datos de los que nosotros les estamos pidiendo
      //Basicamente que este en una lista blanca
      whitelist: true,
      forbidNonWhitelisted: true,
      //Y este permite que transforme los datos siempre cuando pueda. Los datos que se pasan por la URL
      transform: true,
    })
  );
  await app.listen(3000);
}
bootstrap();
