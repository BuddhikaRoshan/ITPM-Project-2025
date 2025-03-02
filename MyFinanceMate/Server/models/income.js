const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const incomeSchema=new Schema({
    description:{
        type:String,
        required:true
    },
    amount:{
        type:float,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    total_income:{
        type:float,
        required:true
    }

})
const Income=mongoose.model("Income",incomeSchema);

module.exports=Income;
