import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

import { AppModule } from './app.module';

let server: Handler;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({ app: expressApp });
}

// Initialize the server once and cache it
const initializeServer = bootstrap().then((initializedServer) => {
    server = initializedServer;
});

export const handler: Handler = async (
    event: any,
    context: Context,
    callback: Callback,
) => {
    await initializeServer;
    return server(event, context, callback);
};