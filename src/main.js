import * as bodyParser from 'body-parser';
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./app.module.js');
const { join } = require('path');



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors({
    origin: "*",
  });
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });
  await app.listen(8000); // Adjust the port as needed
  console.log('Application is running on: http://localhost:8000');
}

bootstrap();
