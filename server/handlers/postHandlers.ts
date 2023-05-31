import { RequestHandler } from "express";
import { db } from "../datastore";
import { Post } from "../types";
import crypto from "crypto";


export type ExpressHandler<Req,Res> = RequestHandler<string,Partial<Res>,Partial<Req>, any>;
type CreatPostRequest = Pick<Post,'title'|'url'|'userId'>;
interface CreatePostResponse{};


export const listPostHandler : ExpressHandler<{},{}> =(_req, res)=>{

    res.send({posts:db.listPost()});
};

export const createPostHandler :ExpressHandler<CreatPostRequest,CreatePostResponse> = (req, res)=>{
   
    if(!req.body.title|| !req.body.url||!req.body.userId){
        return res.sendStatus(400);
    }
    const post :Post ={
        id:crypto.randomUUID(),
        postAt :Date.now(),
        title :req.body.title,
        url :req.body.url,
        userId:req.body.userId

    };
    db.creatPost(post);
    res.sendStatus(200);
};