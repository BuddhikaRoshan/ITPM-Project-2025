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
/*display income */
router.route("/").get((req,res)=>{
    Income.find().then((income)=>{
        res.json(income)
    }).catch((err)=>{
        console.log(err);
    })
})
/*update income */
router.route("/update/:id").put(async(req,res)=>{
    let userId=req.params.id;/*fetch id*/
    const{description,amount,date,total_income}=req.body;

    const updateStudent={
        description,
        amount,
        date,
        total_income
    }
    /*to check user and update*/
    const update=await Income.findByIdAndUpdate(userId,updateStudent);
    
})











module.exports=router;