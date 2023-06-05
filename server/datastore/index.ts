import { CommentDao } from './dao/CommentDao';
import { LikeDao } from './dao/LikeDao';
import { PostDao } from './dao/PostDao';
import { UserDao } from './dao/UserDao';
//import { InMemoryDataStore } from './memoryDB';
import { sqlDataStore } from './sql';

export interface DataStore extends UserDao, CommentDao, PostDao, LikeDao {}

export let db: DataStore;

export async function initDb() {
  //db = new InMemoryDataStore();
  db = await new sqlDataStore().openDb();
}
