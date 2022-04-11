const express=require('express');
const req = require('express/lib/request');
const router=express.Router();
const db=require('./../../config/connection2');
const booksHelper=require('./../helper/bookHelper');
// const data1=require('./../../config/connection');
// let BookData=data1.bookdata;
const print=(data)=>{


router.get("/",(req,res)=>{
    db.bookdata.find()
    .then((books)=>{
        db.authordata.find()
        .then((authors)=>{

            res.render("books",{data,books,authors});
        })

    })
})
router.get("/year",(req,res)=>{
    db.bookdata.find({BookYear:{$gt:2000}})
    .then((e)=>{
        res.send("year");
        console.log(e);

    })
    

})
router.get('/authorbook/:name',(req,res)=>{
    name=req.params.name;
    db.bookdata.find({AuthorName:name}).then((books)=>{
        res.render("books",{books,data})
    })
})
router.get("/:id",(req,res)=>{
    id=req.params.id;
    db.bookdata.findOne({_id:id})
    .then((book)=>{

        res.render("book",{data,id,book})
    })
})
return router;



}


module.exports=print;
