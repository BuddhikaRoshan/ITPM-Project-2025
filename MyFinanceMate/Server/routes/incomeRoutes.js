const router=require("express").Router();
let Income=require("../models/income");

router.route("/add").post((req,res)=>{
    /*get data */
    const description=req.body.description;
    const amount=Float(req.body.amount);
    const date=Date(req.body.date);
    const total_income=Float(req.body.total_income);



    const newIncome=new Income({
        description,
        amount,
        date,
        total_income
    })

    newIncome.save().then(()=>{
        res.json("Income added")
    })
    .catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req,res)=>{
    
})









module.exports=router;