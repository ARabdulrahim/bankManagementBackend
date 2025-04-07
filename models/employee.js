import mongoose, { Schema } from "mongoose";

const empoyeeSchema= new mongoose.Schema({
    username:{
        type: String,
        require: true
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    password:{
        type:String,
        require:true
    }
});

const employeeModel= mongoose.model("employee", empoyeeSchema);

export{employeeModel};