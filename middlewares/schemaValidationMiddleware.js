import { accountHolderValidationSchema } from "../utils/schemaValidation.js"

const accountHolderSchemaValidationMiddelware=(req, res, next)=>{
    try{
        const resp=accountHolderValidationSchema.validate(req.body);
        if(resp.error){
            return res.status(400).send(res.error.message);
        }else{
            next();
        }
    }catch(err){

    }
}

export{accountHolderSchemaValidationMiddelware};