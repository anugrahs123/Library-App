const express=require('express');
const router=express.Router(); 
const BookData=require('./../../config/connection2')
const session=require('express-session')
const {isAuth,store}=require('./../../config/isAuth')
const print=(data)=>{

  router.use(session({
    secret:"key",
    resave:false,
    saveUninitialized:false,
    store:store
}))
router.get("/",isAuth,(req,res)=>{
  BookData.authordata.find()
  .then((authors)=>{
    res.render("authors",{data,authors})

  })

})
router.get("/:id",(req,res)=>{
  id=req.params.id;
  BookData.authordata.findOne({_id:id})
  .then((author)=>{
    console.log("person",author);

    res.render("author",{id,data,author})
  })

})
  return router;
}

module.exports=print;