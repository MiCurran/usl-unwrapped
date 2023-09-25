import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'swagger.config';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  // Call the setupSwagger function with the INestApplication instance
  setupSwagger(app);
  await app.listen(process.env.PORT || 3000, () => {
    console.log(`
🚀 Server ready at: http://localhost:3000/graphql
⭐️ See sample queries in README
`);
  });
}
bootstrap();
