import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    clerkId : {type: String, required :true},
    plan : {type: String,required:true},
    amount: {type:Number,required:true},
    credits: {type:Number,required:true},
    payment: {type: Boolean, default: false},
    date : {type: Date},
})


const transcationModel = mongoose.models.transcation || mongoose.model('transaction',transactionSchema);

export default transcationModel;