import { CommentDao } from './dao/CommentDao';
import { LikeDao } from './dao/LikeDao';
import { PostDao } from './dao/PostDao';
import { UserDao } from './dao/UserDao';
import { InMemoryDataStore } from './memoryDB';

export interface dataStore extends UserDao, CommentDao, PostDao, LikeDao {}

export const db = new InMemoryDataStore();
