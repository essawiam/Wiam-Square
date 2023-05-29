import { CommentDao } from "./CommentDao";
import { LikeDao } from "./LikeDao";
import { PostDao } from "./PostDao";
import { InMemoryDataStore } from "./memoryDB";
import { UserDao } from "./UserDao";

export interface dataStore extends UserDao,CommentDao,PostDao,LikeDao{};


export const db = new InMemoryDataStore();