const express=require('express');
const router=express.Router(); 
const db=require('./../../config/connection2')
const session=require('express-session')
const {isAuth,store,isAdmin}=require('./../../config/isAuth')
const print=(data)=>{

  router.use(session({
    secret:"key",
    resave:false,
    saveUninitialized:false,
    store:store
}))
router.get("/",isAuth,(req,res)=>{
  db.authordata.find()
  .then((authors)=>{
    res.render("authors",{data,authors})

  })

})
router.get("/:id",(req,res)=>{
  id=req.params.id;
  db.authordata.findOne({_id:id})
  .then((author)=>{
    console.log("person",author);

    res.render("author",{id,data,author})
  })

})


router.get("/dlt/:id",isAdmin,(req,res)=>{
  id=req.params.id;
  db.authordata.deleteOne({_id:id})
  .then((book)=>{

  res.redirect("/authors")
})
})
router.get("/edit/:id",isAdmin,(req,res)=>{
id=req.params.id;
db.authordata.findOne({_id:id}).then((value)=>{
  console.log("value",value);

  res.render("editauthor",{id,value,data})
})


})


  return router;
}

module.exports=print;