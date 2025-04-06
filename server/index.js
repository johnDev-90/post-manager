import express, { json } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mysql from 'mysql2'
import { postRoute } from './Routes/post.js'
import { loginRoute } from './Routes/loging.js'

dotenv.config()


const PORT = 3000

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:3001',
    credentials:true
}))

export const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'postmanager',
});

app.use('/api',postRoute);
app.use('/api',loginRoute);



app.listen(PORT , () => {
    console.log(`Listening port ${PORT}`)
})
