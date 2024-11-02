import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) =>
        errors.map((error) => ({
          field: error.property,
          errors: Object.values(error.constraints),
        })),
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter()); // Add the global exception filter

  await app.listen(3000);
}
bootstrap();

