import { accountHolderModel } from "../models/accountHolder.js";
import { transectionModel } from "../models/transectionModel.js";


//fetch all account
const getAllAccount=async(req, res)=>{
    try{
        const data= await accountHolderModel.find({});
        if(data.length<1){
            return res.status(403).send({sueccss: false, message:"account not found!"});
        }
        return res.status(200).send({sueccss: true, message:"All account has fetched!",data});
    }catch(err){
        return res.status(500).send({sueccss: false, message:"something went wrong!"});
    }
}

//fetch account details by aadharno
const getAccountById= async(req, res)=>{
    try{
        const{aadhar}=req.params;
        const data= await accountHolderModel.findOne({aadhar});
        if(!data){
            return res.status(403).send({sueccss: false, message:"account not found!"});
        }
        return res.status(200).send({sueccss: true, message:"data has fetched!",data});
    }catch(err){
        return res.status(500).send({sueccss: false, message:"something went wrong!"});
    }
}

//create new account
const createNewAccount=async(req, res)=>{
    try{
        const{username, aadhar, phone, gender, dob,address, account}=req.body;
        const user=await accountHolderModel.findOne({aadhar});
        if(user){
            return res.status(400).send({success: false, message: "user account allready created!"});
        }
        for (let ac of account) {
            let isAccountNumberUnique = false;
            while (!isAccountNumberUnique) {
                const accountNo = "1269001700" + Math.floor(100000 + Math.random() * 900000);  
                const existingAccount = await accountHolderModel.findOne({ "account.accountNo": accountNo });
                if (!existingAccount) {
                    ac.accountNo = accountNo;
                    isAccountNumberUnique = true;
                }
            }
        }
        const newAccount=new accountHolderModel({username, aadhar, phone, dob, gender, address, account});
        const data= await newAccount.save();
        return res.send({success: true, message:"Account created successfully!",data});
    }catch(err){
        return res.status(500).send({sueccss: false, message:"something went wrong!"});
    }
}

//fetch account details for edit
const getAccountEditById= async(req, res)=>{
    try{
        const{aadhar}=req.params;
        const data= await accountHolderModel.findOne({aadhar});
        if(!data){
            return res.status(403).send({sueccss: false, message:"account not found!"});
        }
        return res.status(200).send({sueccss: true, message:"data has fetched!",data});
    }catch(err){
        return res.status(500).send({sueccss: false, message:"something went wrong!"});
    }
}

//update account
const updateAccount= async(req, res)=>{
    try{
        const{username, aadhar, phone, gender, dateOfBirth,address, account }=req.body;

        const data=await accountHolderModel.findOneAndUpdate({aadhar},{
            username:username,
            aadhar:aadhar,
            phone:phone,
            dateOfBirth: dateOfBirth,
            gender: gender,
            address: address,
            account: account 
        });

        res.status(200).send({success: true, message:"account is updated!", data});
    }catch(err){
        return res.status(500).send({sueccss: false, message:"something went wrong!"});
    }
}

//delete account
const deleteAccount=async(req, res)=>{
    try{
        const{aadhar}=req.params;
        const data= await accountHolderModel.findOneAndDelete({aadhar});
        if(!data){
            return res.status(404).send({sueccss: false, message:"Account Not Found!"});
        }
        return res.status(200).send({sueccss: true, message:"data is delete!",data});
    }catch(err){
        return res.status(500).send({sueccss: false, message:"something went wrong!"});
    }
}

//credit balance
const creditBalance=async(req, res)=>{
    try{
        let{aadhar, balance}=req.body;
       const user=await accountHolderModel.findOne({aadhar});
       if(!user){
        return res.status(404).send({sueccss: false, message:"account not found!"});
       }
       for(let ac of user.account){
         ac.balance+=Number(balance);
       }
       const newTranscetcion=new transectionModel({
        senderId: "Branch Name",
        recieverId: aadhar,
        balance: balance,
        transcetiontype: "credit"
      })
      user.transection.push(newTranscetcion);
     let data=  await user.save();
     await newTranscetcion.save();
     return res.status(200).send({success: true, message:"balanced is credited!", data})
    }catch(err){
        return res.status(500).send({sueccss: false, message:"something went wrong!"});
    }
}

// debit balance
const debitBalance=async(req, res)=>{
    try{
        let{aadhar, balance}=req.body;
        const user=await accountHolderModel.findOne({aadhar});
       if(!user){
        return res.status(404).send({sueccss: false, message:"account not found!"});
       }
        for(let ac of user.account){
            if(balance > ac.balance){
                return res.status(400).send({success: false, message:"balance is insufficient!"});
            }else{
                ac.balance-=Number(balance);
            }
          }
          const newTranscetcion=new transectionModel({
            senderId: "Branch Name",
            recieverId: aadhar,
            balance: balance,
            transcetiontype: "debit"
          })
          user.transection.push(newTranscetcion);
          let data=  await user.save();
          await newTranscetcion.save();
     return res.status(200).send({success: true, message:"balanced is debited!", data})
    }catch(err){
        return res.status(500).send({sueccss: false, message:"something went wrong!"});
    }
}

//check balance 
const checkAccountBalance=async(req, res)=>{
    try{
        const{aadhar}=req.params;
        const data=await accountHolderModel.findOne({aadhar});
        if(!data){
            return res.status(404).send({success:false, message:"Account Not Found!"});
        }
        return res.status(200).send({success:false, message:"Balance is fetched!", data})
    }catch(err){
        return res.status(500).send({sueccss: false, message:"something went wrong!"});
    }
}


//transfer balance ono to another
const transferBalance= async(req, res)=>{
    try{
       const {senderaadhar, recieveraadhar, balance}=req.body;
       
       let senderUser=await accountHolderModel.findOne({aadhar: senderaadhar});
       if(!senderUser){
        return res.status(404).send({success: false, message:"sender account not found!"});
       }

       let recieverUser= await accountHolderModel.findOne({aadhar: recieveraadhar});
       if(!recieverUser){
        return res.status(404).send({success: false, message:"reciever account not found!"});
       }

       for(let sender of senderUser.account){
           if(balance > sender.balance){
            return res.status(400).send({success: false, message:"balance is insufficient!"});
           }else{
            sender.balance-=Number(balance);
           }
       }

       for(let reciever of recieverUser.account){
         reciever.balance+=Number(balance);
       }
       let SenderTranscetion= new transectionModel({
        senderId: senderaadhar,
        recieverId: recieveraadhar,
        balance: balance,
        transcetiontype: "debit"
     });
     let recieverTranscetion= new transectionModel({
        senderId: senderaadhar,
        recieverId: recieveraadhar,
        balance: balance,
        transcetiontype: "credit"
     });
      senderUser.transection.push(SenderTranscetion);
      recieverUser.transection.push(recieverTranscetion);
     let data= await Promise.all([senderUser.save(), recieverUser.save()]);
    await Promise.all([SenderTranscetion.save(), recieverTranscetion.save()]);
     return res.status(200).send({success: true, message:"balanced is transfer successfully!", data})
    }catch(err){
        return res.status(500).send({sueccss: false, message:"something went wrong!"});
    }
}

//fetch transections
const getTransections=async(req, res)=>{
    try{
        const{aadhar}=req.params;
        const user=await accountHolderModel.findOne({aadhar}).populate("transection")
        if(!user){
            return res.status(404).send({success:false, message:"Account Not Found!"});
        }
        let data=user.transection;
        return res.status(200).send({success: true, message:"transection is fetched successfully!", data});
    }catch(err){
        return res.status(500).send({sueccss: false, message:"something went wrong!"});
    }
}

//delete transectino
const deleteTransection=async(req, res)=>{
    try{
        const {id}=req.params;
        const aadhar=req.query.aadhar;
    
       let dat= await accountHolderModel.findOneAndUpdate({aadhar},{$pull: {transection: id}});
        const data=await transectionModel.findByIdAndDelete(id);
        return res.status(200).send({success: true, message:"transection is deleted successfully!", data})
    }catch(err){
        return res.status(500).send({sueccss: false, message:"something went wrong!"});
    }
}
export{createNewAccount,getAllAccount, getAccountById, deleteAccount, getAccountEditById, updateAccount, creditBalance, debitBalance, transferBalance, checkAccountBalance, getTransections, deleteTransection};