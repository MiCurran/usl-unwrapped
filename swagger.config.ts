// swagger.config.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('USL Match & Player Statistics API Documentation')
    .setDescription('Match & Player Statistics plus Match Events from USL soccer league matches. \n https://usl-unwrapped-277334b8c4d7.herokuapp.com')
    .setVersion('1.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
}
