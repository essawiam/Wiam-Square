
import express from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { createPostHandler, listPostHandler} from './handlers/postHandlers';

const app = express();
app.use(express.json());

const requestMiddelWare :RequestHandler =(req, _res, next)=>{
   console.log("Methos = ",req.method,"Path = ",req.path,"Body = ", req.body);
   next();
}
app.use(requestMiddelWare);

app.get('/posts', listPostHandler);

app.post('/posts',createPostHandler);
 
app.listen(3000);