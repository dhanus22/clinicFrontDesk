import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'https://clinic-front-desk-kk2505x1g-saidhanus-projects.vercel.app/login',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
