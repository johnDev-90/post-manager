import express from 'express'
import JWT from 'jsonwebtoken'
import { db } from '../index.js';




export const postRoute = express.Router();

postRoute.post('/posts/new',(req, res) => {
    const token =   req.cookies.token;
    const { title, content } = req.body;

    console.log(title)
    console.log(content)
   

    if(!token) return res.status(401).send({message:'No token provided, authentication required'});
    const payLoad = JWT.verify(token, process.env.SECRET_KEY);

    if(!payLoad) return res.status(401).send({message:'User not authorized'});

   

    db.query('INSERT INTO postmanager.post (userId, title, content) VALUES (?, ?, ?)', [payLoad.userId, title, content], (err, result) => {
        if (err) return res.status(500).send({ message: 'An error occurred while querying the database.', error: err });
        res.status(200).send({ message: 'New Post successfully created.', result: result });
      });

    
    
})

postRoute.get('/posts',(req, res) => {
     const token =   req.cookies.token;

     console.log(token)

     if(!token) return res.status(401).send({message:'No token provided, authentication required'});
     const payLoad = JWT.verify(token, process.env.SECRET_KEY);

     if(!payLoad) return res.status(401).send({message:'User not authorized'});



    

     db.query('SELECT * FROM postmanager.post WHERE userId = ?', [payLoad.userId],  (err,result) => {

        if(err) return res.status(500).send({message:'An error occurred while querying the database.',error:err});
        console.log(result)
        res.status(200).send(result);

     });

     
     
})

postRoute.get('/posts/:id',(req, res) => {
    const token =   req.cookies.token;
    const postId = req.params.id

    console.log(postId)

    if(!token) return res.status(401).send({message:'No token provided, authentication required'});
    const payLoad = JWT.verify(token, process.env.SECRET_KEY);

    if(!payLoad) return res.status(401).send({message:'User not authorized'});


    db.query('SELECT * FROM postmanager.post WHERE id = ?', postId,  (err,result) => {

       if(err) return res.status(500).send({message:'An error occurred while querying the database.',error:err});

       res.status(200).send(result[0]);

    });

    
    
})

