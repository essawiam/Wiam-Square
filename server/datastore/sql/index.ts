import path from 'path';
import { Database, open as sqlitOpen } from 'sqlite';
import sqlite3 from 'sqlite3';

import { DataStore } from '..';
import { Comment, Like, Post, User } from '../../types';

export class sqlDataStore implements DataStore {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;
  public async openDb() {
    this.db = await sqlitOpen({
      filename: path.join(__dirname, 'wiamdb.sqlite'),
      driver: sqlite3.Database,
    });
    this.db.run('PRAGMA foreign_keys = ON;');
    this.db.migrate({
      migrationsPath: path.join(__dirname, 'migrations'),
    });
    return this;
  }
  // User
  createUser(_user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getUserByEmail(_email: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  getUserByName(_name: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  // Comment
  createComment(_comment: Comment): Promise<void> {
    throw new Error('Method not implemented.');
  }
  listComment(_postId: string): Promise<Comment[]> {
    throw new Error('Method not implemented.');
  }
  deleteComment(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  // Post
  listPost(): Promise<Post[]> {
    return this.db.all<Post[]>('SELECT * FROM posts');
  }
  async creatPost(post: Post): Promise<void> {
    await this.db.run(
      'INSERT INTO posts (id, title, url, postedAt, userId) VALUES (?,?,?,?,?)',
      post.id,
      post.title,
      post.url,
      post.postAt,
      post.userId
    );
  }
  getPost(_id: string): Promise<Post | undefined> {
    throw new Error('Method not implemented.');
  }
  deletePost(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  //Like
  createLike(_like: Like): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
