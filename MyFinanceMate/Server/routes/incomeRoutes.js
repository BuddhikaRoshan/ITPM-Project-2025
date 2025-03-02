const router=require("express").Router();
let Income=require("../models/income");

router.route("/add").post((req,res)=>{
    /*get data */
    const description=req.body.description;
    const amount=req.body.amount;
    const date=req.body.date;
    const total_income=req.body.total_income;
}
)
