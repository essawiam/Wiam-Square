import path from 'path';
import { open as sqlitOpen } from 'sqlite';
import sqlite3 from 'sqlite3';

import { DataStore } from '..';
import { Comment, Like, Post, User } from '../../types';

export class sqlDataStore implements DataStore {
  public async openDb() {
    const db = await sqlitOpen({
      filename: path.join(__dirname, 'wiamdb.sqlite'),
      driver: sqlite3.Database,
    });
    await db.migrate({
      migrationsPath: path.join(__dirname, 'migrations'),
    });
    return this;
  }
  createUser(_user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getUserByEmail(_email: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  getUserByName(_name: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  createComment(_comment: Comment): Promise<void> {
    throw new Error('Method not implemented.');
  }
  listComment(_postId: string): Promise<Comment[]> {
    throw new Error('Method not implemented.');
  }
  deleteComment(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  listPost(): Promise<Post[]> {
    throw new Error('Method not implemented.');
  }
  creatPost(_post: Post): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getPost(_id: string): Promise<Post | undefined> {
    throw new Error('Method not implemented.');
  }
  deletePost(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  createLike(_like: Like): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
