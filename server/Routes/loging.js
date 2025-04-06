import express from 'express'
import { db } from '../index.js';
import JWT from 'jsonwebtoken'
import cookieParser from 'cookie-parser';


export const loginRoute = express.Router()

loginRoute.post('/login',(req, res) => {
     
const {userName, password} = req.body;

if(!userName || !password) return res.status(500).send({message:'bad request'})

db.query('SElECT * FROM postmanager.users WHERE userName=?', userName, (err, result) => {

    if (err)
        return res.status(500).send({
          message: "There was an error while fetching the database",
          error: err,
        });

        const user = result[0]

        if(password !== user.passworHash ) return res.status(401).send({message:'incorrect Password'})

        const payLoad = {
            userId:user.id,
            userName:userName
        }

        const token = JWT.sign(payLoad,process.env.SECRET_KEY,{expiresIn:'1h'})

        res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            maxAge:3600000
        });

        res.status(200).send({message:'Welcome back!'})


})


     
     
})