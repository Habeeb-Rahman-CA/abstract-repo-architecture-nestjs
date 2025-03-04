import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/helpers/transform.interceptor';
import { AllExceptionsFilter } from './common/helpers/error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 // Set global prefix

   const config = new DocumentBuilder()
   .setTitle('P2P')
   .setDescription('API description for P2P project')
   .setVersion('1.0')
   .addBearerAuth() // Enables JWT Auth in Swagger
   .build();
   app.setGlobalPrefix('api');

 app.useGlobalInterceptors(new ResponseInterceptor());
 app.useGlobalFilters(new AllExceptionsFilter());
 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
