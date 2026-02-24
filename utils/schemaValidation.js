import Joi from 'joi';

const accountHolderValidationSchema = Joi.object({
    username: Joi.string().required(),
    aadhar: Joi.number().required().min(100000000000).max(999999999999), 
    email: Joi.string(),
    phone: Joi.number().required().min(1000000000).max(9999999999), 
    dob: Joi.date().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    address: Joi.string().required(),
    account: Joi.array().items(Joi.object({
        accountType: Joi.string().valid('saving', 'credit', 'business').required(),
        balance: Joi.number().min(0).default(0),
        status: Joi.string().valid('active', 'inactive', 'closed').default('active')
    })).required()
});

export{accountHolderValidationSchema};