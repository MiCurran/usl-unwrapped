import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { SimpleMiddleware } from './middlewares/analytics.middleware'; // Import the class-based middleware
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {bufferLogs: true});
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  // Call the setupSwagger function with the INestApplication instance
  setupSwagger(app);
  // Use the class-based middleware
  // Instantiate and register the class-based middleware
  const simpleMiddleware = new SimpleMiddleware();
  app.use(simpleMiddleware.use.bind(simpleMiddleware));

  await app.listen(process.env.PORT || 3000, () => {
    console.log(`
🚀 Server ready at: http://localhost:3000/graphql
⭐️ See sample queries in README
`);
  });
}
bootstrap();
