import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
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

  async signup(createUserDto: CreateUserDto): Promise<void> {
    const db = admin.database();
    const usersRef = db.ref('/users');
    const key = usersRef.push(createUserDto).key;
    const newUsernameRef = db.ref(`/usernames/${key}`);
    newUsernameRef.set({ username: createUserDto.username });
  }

  async findUser(username: string): Promise<User> {
    const db = admin.database();
    const usersRef = db.ref(`/users`);
    return await usersRef
      .orderByChild('username')
      .equalTo(username)
      .limitToLast(1)
      .once('value')
      .then((userSnapshot) => {
        const user: User = Object.values(userSnapshot.val())[0];
        user.id = Object.keys(userSnapshot.val())[0];
        return user;
      });
  }
}