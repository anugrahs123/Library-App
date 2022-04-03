const express=require('express');
const router=express.Router(); 
const print=(data)=>{

    
router.get("/",(req,res)=>{
    res.render("authors",{data})

})
router.get("/:id",(req,res)=>{
    id=req.params.id;
    res.render("author",{id,data})

})
  return router;
}

module.exports=print;