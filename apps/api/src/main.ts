import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors({
        origin: ['http://localhost:3000', '*'], // URL do frontend
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Métodos HTTP permitidos
        allowedHeaders: 'Content-Type, Accept, Authorization', // Headers permitidos
        credentials: true, // Habilita o envio de cookies
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    app.useStaticAssets(join(__dirname, '..', 'upload/files'), {
        prefix: 'api/files/',
    });
    BigInt.prototype['toJSON'] = function () {
        return this.toString();
    };

    await app.listen(8084);
}
bootstrap();
