const express= require('express');
const router=express.Router();
const data1=require('./../../config/connection2')

router.use(express.urlencoded({ extended: true })) ;

router.get("/",(req,res)=>{
    res.render("signup");

});
router.post("/get",(req,res)=>{
    if(!req.body.email||!req.body.zip||!req.body.password){
        res.json({message:"all fields are required"})
        // req.redirect('/signup')
      }else{

   let log={
       Email:req.body.email,
       Password:req.body.password,
       Address:req.body.address,
       Address2:req.body.address2,
       City:req.body.city,
       State:req.body.state,
       Zip:req.body.zip
   }
   let log2=data1.Userdata(log);
   log2.save();
   console.log(log2);
   res.redirect('/login')
}

});
module.exports=router;