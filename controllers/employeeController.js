import {} from 'dotenv/config';
import {employeeModel} from "../models/employee.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRETY_KEY=process.env.SECRETY_KEY;

//register controller
const  registerEmployee=async(req, res)=>{
    try{
        const{username, email, password}=req.body;
        const user=await employeeModel.findOne({email});
        if(user){
            return res.status(400).send({success: false, message: "user allready register"});
        }
        const hashPassword= await bcrypt.hash(password, 10);
        const newUser= new employeeModel({
            username: username,
            email: email,
            password: hashPassword
        });
        const data=await newUser.save();
        console.log(data)
        return res.status(200).send({success: true, message: "user registered successfully!",data});
    }catch(err){
        return res.status(500).send({success: false, message: "something went wrong!"});
    }
};

//login controller
const loginEmployee=async(req, res)=>{
    try{
        const{email, password}=req.body;
        const user=await employeeModel.findOne({email});
        if(!user){
            return res.status(404).send({success: false, message: "user not found!"});
        }
        const checkPassword=await bcrypt.compare(password, user.password);
        if(!checkPassword){
            return res.status(400).send({success: false, message: "Invalid password!"});
        }
        const token= jwt.sign(JSON.stringify(user._id), SECRETY_KEY);
        return res.status(200).send({success: true, message: "user loggedin successfully", token, user});
    }catch(err){
        return res.status(500).send({success: false, message: "something went wrong!"});
    }
}

export{registerEmployee, loginEmployee};