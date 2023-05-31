import { dataStore } from '..';
import { Comment, Like, Post, User } from '../../types';

export class InMemoryDataStore implements dataStore {
  private users: User[] = [];
  private posts: Post[] = [];
  private likes: Like[] = [];
  private commets: Comment[] = [];

  // User
  createUser(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }
  getUserByEmail(email: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find(u => u.email === email));
  }
  getUserByName(name: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find(u => u.userName === name));
  }
  //Comment
  createComment(comment: Comment): Promise<void> {
    this.commets.push(comment);
    return Promise.resolve();
  }
  listComment(postId: string): Promise<Comment[]> {
    return Promise.resolve(this.commets.filter(c => c.postId === postId));
  }
  deleteComment(id: string): Promise<void> {
    const index = this.commets.findIndex(c => c.id === id);
    if (index === -1) {
      return Promise.resolve();
    }
    this.commets.splice(index, 1);
    return Promise.resolve();
  }
  // Post
  listPost(): Promise<Post[]> {
    return Promise.resolve(this.posts);
  }
  creatPost(post: Post): Promise<void> {
    this.posts.push(post);
    return Promise.resolve();
  }
  getPost(id: string): Promise<Post | undefined> {
    return Promise.resolve(this.posts.find(p => p.id === id));
  }
  deletePost(id: string): Promise<void> {
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) {
      return Promise.resolve();
    }
    this.posts.splice(index, 1);
    return Promise.resolve();
  }
  // Like
  createLike(like: Like): Promise<void> {
    this.likes.push(like);
    return Promise.resolve();
  }
}
