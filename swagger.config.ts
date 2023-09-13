// swagger.config.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('USL Match Statistics API Documentation')
    .setDescription('Match Statistics and Match Events from USL soccer league matches.')
    .setVersion('1.0')
    .addBearerAuth() // Add a Bearer token authentication definition
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}
