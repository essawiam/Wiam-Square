import { dataStore } from "..";
import { User, Comment, Post, Like } from "../../types";


export class InMemoryDataStore implements dataStore{
    private users:User[] =[];
    private posts:Post[] =[];
    private likes:Like[] =[];
    private commets:Comment[] =[];

    // User
    createUser(user: User): void {
        this.users.push(user);
    }
    getUserByEmail(email: string): User | undefined {
       return this.users.find(u => u.email === email);
    }
    getUserByName(name: string): User | undefined {
        return this.users.find(u => u.userName === name);
    }
    //Comment
    createComment(comment: Comment): void {
       this.commets.push(comment);
    }
    listComment(postId: string): Comment[] {
       return this.commets.filter(c=>c.postId === postId);
    }
    deleteComment(id: string): void {
        const index = this.commets.findIndex(c=>c.id === id);
        if(index === -1){
         return;
        }
        this.commets.splice(index,1);
    }
    // Post
    listPost(): Post[] {
       return this.posts;
    }
    creatPost(post: Post): void {
        this.posts.push(post);
    }
    getPost(id: string): Post | undefined {
       return this.posts.find(p =>p.id === id);
    }
    deletePost(id: string): void {
       const index = this.posts.findIndex(p=>p.id === id);
       if(index === -1){
        return;
       }
       this.posts.splice(index,1);
    }
    // Like
    createLike(like: Like): void {
        this.likes.push(like);
    }
}