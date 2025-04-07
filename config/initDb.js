import {} from 'dotenv/config';
import mongoose from "mongoose";

let url=process.env.DBURL;

async function connectToDB() {
    try{
        await mongoose.connect(url);
        console.log("connect to db")
    }catch(er){
        console.log(`error in db connection ${er}`);
    }
}

export{connectToDB};