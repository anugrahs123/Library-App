const express=require('express');
const router=express.Router();
const BookData=require('./../../config/connection');
const print=(data)=>{


router.get("/",(req,res)=>{
    BookData.find()
    .then((books)=>{

        res.render("books",{data,books});
    })
})
router.get("/:id",(req,res)=>{
    id=req.params.id;
    res.render("book",{data,id})
})
return router;



}


module.exports=print;
