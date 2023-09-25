// swagger.config.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('USL Match & Player Statistics API Documentation')
    .setDescription('Match & Player Statistics plus Match Events from USL soccer league matches.')
    .setVersion('1.0')
    .addBearerAuth() // Add a Bearer token authentication definition
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
}
