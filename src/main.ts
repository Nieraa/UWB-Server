import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ServiceAccount } from 'firebase-admin';

import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { ValidationPipe } from '@nestjs/common';

const expressServer: express.Express = express();

export const createFunction = async (expressInstance: express.Express) => {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(expressInstance)
  );
  const configService: ConfigService = app.get(ConfigService);
  // Set the config options

  const adminConfig: ServiceAccount = {
    projectId: configService.get<string>('PROJECT_ID'),
    privateKey: configService.get<string>('PRIVATE_KEY').replace(/\\n/g, '\n'),
    clientEmail: configService.get<string>('CLIENT_EMAIL'),
  };
  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: `https://${adminConfig.projectId}-default-rtdb.asia-southeast1.firebasedatabase.app/`,
  });

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get<string>('API_PORT') || 5000);
  return app.init();
};

createFunction(expressServer)
  .then((v) => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err));
export const api: functions.HttpsFunction = functions.https.onRequest(expressServer);