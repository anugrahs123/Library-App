const express=require('express');
const router=express.Router();
const BookData=require('./../../config/connection');
// const data1=require('./../../config/connection');
// let BookData=data1.bookdata;
const print=(data)=>{


router.get("/",(req,res)=>{
    BookData.find()
    .then((books)=>{

        res.render("books",{data,books});
    })
})
router.get("/year",(req,res)=>{
    BookData.find({BookYear:{$gt:2000}})
    .then((e)=>{
        res.send("year");
        console.log(e);

    })
    

})
router.get("/:id",(req,res)=>{
    id=req.params.id;
    BookData.findOne({_id:id})
    .then((book)=>{

        res.render("book",{data,id,book})
    })
})
return router;



}


module.exports=print;
