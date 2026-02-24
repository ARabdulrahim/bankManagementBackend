import mongoose, { Schema } from 'mongoose';


const accountHolderSchema=new mongoose.Schema({
    username:{
        type: String,
        require: true,
    },
    aadhar:{
        type: Number,
        unique: true,
        require: true,
    },
    email:{
        type: String,
        require: true
    },
    phone:{
        type : Number,
        require: true,
    },
    dob:{
        type:Date,
        require: true,
    },
    gender:{
        type: String,
        enum: ['male', 'female', 'other']
    },
    address:{
        type: String,
        require: true
    },
    transection:[
        {
            type: Schema.Types.ObjectId,
            ref:"Transection"
        }
    ],

    account:[{
        accountType: {
            type: String,
            enum: ['saving', 'credit', 'business'],
            require: true
        },
        accountNo:{
            type: String,
            unique: true,
            require: true,
        },
        balance:{
            type: Number,
            min: 0,
            default: 0
        },
        status:{
            type:String,
            enum: ['active', 'inactive', 'closed'],
            default: 'active'
        }
    }],

},{timestamps:true});


const accountHolderModel= mongoose.model("accountHolder", accountHolderSchema);

export{accountHolderModel};