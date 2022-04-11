const express=require('express');
const router=express.Router(); 
const BookData=require('./../../config/connection2')
const print=(data)=>{

    
router.get("/",(req,res)=>{
  BookData.authordata.find()
  .then((authors)=>{
    res.render("authors",{data,authors})

  })

})
router.get("/:id",(req,res)=>{
  id=req.params.id;
  BookData.authordata.findOne({_id:id})
  .then((author)=>{

    res.render("author",{id,data,author})
  })

})
  return router;
}

module.exports=print;