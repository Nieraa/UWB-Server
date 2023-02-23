import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const expressServer = express();


export const createFunction = async (expressInstance: express.Express) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance)
  );

  // Initialize the firebase admin app
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: functions.config().admin_firebase_config.project_id,
        clientEmail: functions.config().admin_firebase_config.client_email,
        privateKey: functions.config().admin_firebase_config.private_key.replace(/\\n/g, '\n'),
      }),
      databaseURL: `https://${functions.config().admin_firebase_config.project_id}-default-rtdb.asia-southeast1.firebasedatabase.app/`,
    });
  }

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
};

export const api = functions.https.onRequest(async (request, response) => {
  await createFunction(expressServer);
  expressServer(request, response);
});