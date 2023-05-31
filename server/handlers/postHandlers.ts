import crypto from 'crypto';

import { CreatPostRequest, CreatePostResponse, ListPostsRequest, ListPostsResponse } from '../api';
import { db } from '../datastore';
import { ExpressHandler, Post } from '../types';

export const listPostHandler: ExpressHandler<ListPostsRequest, ListPostsResponse> = (_req, res) => {
  res.send({ posts: db.listPost() });
};

export const createPostHandler: ExpressHandler<CreatPostRequest, CreatePostResponse> = (
  req,
  res
) => {
  //TODO : Do the validation

  if (!req.body.title || !req.body.url || !req.body.userId) {
    return res.sendStatus(400);
  }
  const post: Post = {
    id: crypto.randomUUID(),
    postAt: Date.now(),
    title: req.body.title,
    url: req.body.url,
    userId: req.body.userId,
  };
  db.creatPost(post);
  res.sendStatus(200);
};
