import {} from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectToDB } from './config/initDb.js';
import empoyeeRoute from './routes/employeeRoute.js';
import accountHolderRoute from './routes/accountHolderRoute.js';
const app=express();

let port=process.env.PORT || 3000;

//connect to db
connectToDB();

app.use(express.json());
app.use(cors());

//route
app.use("/employee", empoyeeRoute)
app.use("/account", accountHolderRoute);

app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
})
