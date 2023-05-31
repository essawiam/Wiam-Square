import { CommentDao } from './CommentDao';
import { LikeDao } from './LikeDao';
import { PostDao } from './PostDao';
import { UserDao } from './UserDao';
import { InMemoryDataStore } from './memoryDB';

export interface dataStore extends UserDao, CommentDao, PostDao, LikeDao {}

export const db = new InMemoryDataStore();
