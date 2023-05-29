
import express from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { db } from './datastore';

const app = express();
app.use(express.json());

const requestMiddelWare :RequestHandler =(req, _res, next)=>{
   console.log("Methos = ",req.method,"Path = ",req.path,"Body = ", req.body);
   next();
}

app.get('/posts',requestMiddelWare,(_req, res)=>{

     res.send({post:db.listPost});
 });

app.post('/posts',requestMiddelWare,(req, res)=>{
    console.log('body: ',req.body);  
    const post =req.body;
    db.creatPost(post);

    res.sendStatus(200);
});


app.listen(3000);