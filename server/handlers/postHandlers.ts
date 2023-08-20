import crypto from 'crypto';

import { CreatPostRequest, CreatePostResponse, ListPostsRequest, ListPostsResponse } from '../api';
import { db } from '../datastore';
import { ExpressHandler, Post } from '../types';

export const listPostHandler: ExpressHandler<ListPostsRequest, ListPostsResponse> = async (
  _req,
  res
) => {
  res.send({ posts: await db.listPost() });
};

export const createPostHandler: ExpressHandler<CreatPostRequest, CreatePostResponse> = async (
  req,
  res
) => {
  //TODO : Do the validation

  if (!req.body.title || !req.body.url) {
    return res.sendStatus(400);
  }
  const post: Post = {
    id: crypto.randomUUID(),
    postAt: Date.now(),
    title: req.body.title,
    url: req.body.url,
    userId: res.locals.userId,
  };
  await db.creatPost(post);
  res.sendStatus(200);
};
