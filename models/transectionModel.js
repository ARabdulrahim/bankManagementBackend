import mongoose from 'mongoose';

const transectionSchema= new mongoose.Schema({
    senderId:{
        type: String,
    },
    recieverId: {
        type: String, 
    },
    balance:{
        type:Number,
        require:true
    },
    transcetiontype:{
        type: String,
        require:true,
    }
},{timestamps:true});

const transectionModel=mongoose.model("Transection", transectionSchema);
export{transectionModel};