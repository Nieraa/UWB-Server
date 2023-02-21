import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

export type User = any;

@Injectable()
export class UsersService {
  async getUsernames(): Promise<string[]> {
    const db = admin.database();
    const usernamesRef = db.ref(`/usernames`);
    return await usernamesRef
      .once('value')
      .then((usernamesSnapshot) => {
        const usernames: string[] = usernamesSnapshot.val() !== null ? Object.values(usernamesSnapshot.val()) : [];
        return usernames;
      });
  }
}