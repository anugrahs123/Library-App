const express=require('express');
const router=express.Router();
const print=(data)=>{


router.get("/",(req,res)=>{
    res.render("books",{data});
})
router.get("/:id",(req,res)=>{
    id=req.params.id;
    res.render("book",{data,id})
})
return router;



}


module.exports=print;
