const express= require('express');
const router=express.Router();
const db=require('./../../config/connection2')
const bcrypt=require('bcrypt')

router.use(express.urlencoded({ extended: true })) ;

router.get("/",(req,res)=>{
    res.render("signup");

});
router.post("/get",async(req,res)=>{
    if(!req.body.email||!req.body.zip||!req.body.password){
        res.json({message:"all fields are required"})
        // req.redirect('/signup')
      }
      else{
          try{

    
              let hashPassword=await bcrypt.hash(req.body.password,10)
          

   let log={
       Email:req.body.email,
       Password:hashPassword,
       Address:req.body.address,
       Address2:req.body.address2,
       City:req.body.city,
       State:req.body.state,
       Zip:req.body.zip
   }
   //localStorage.setItem(log)
   let log2=db.Userdata(log);
   log2.save();
   console.log(log2);
   res.redirect('/login')
}
catch{

}
}

});
module.exports=router;