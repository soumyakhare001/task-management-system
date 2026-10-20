import express from 'express';
import dotenv from 'dotenv';
import { ConnectDb } from './Config/ConnectDb.js';
import cors from 'cors';
import { router } from './Routers/Router.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app=express();
app.use(express.json());
// app.use(cors({

// }))


app.use(cookieParser());
app.use('/api',router);





const port=process.env.PORT||5000

app.get('/',(req,res)=>{
    res.json("hello");
})

app.listen(port,()=>{
    console.log("listening to the port : ",port);
    ConnectDb();
})