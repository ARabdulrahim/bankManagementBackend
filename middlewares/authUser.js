import {} from 'dotenv/config';
import jwt from 'jsonwebtoken';

let SECRETY_KEY=process.env.SECRETY_KEY;
const authUser=async(req, res, next)=>{
    let token=req.headers['authorization'];
    if(token){
        token= token.split(' ')[1];
        jwt.verify(token, SECRETY_KEY, (err, valid)=>{
            if(err){
                return res.status(400).send({success:false, message:"provide valid token!"});
            }else{
                next();
            }
        })

    }else{
        return res.status(400).send({success:false, message:"provide token!"});
    }
}

export {authUser};