const express=require('express');
const req = require('express/lib/request');
const router=express.Router();
const db=require('./../../config/connection2');
const booksHelper=require('./../helper/bookHelper');
const session=require('express-session')
const {isAuth,store}=require('./../../config/isAuth')
// const data1=require('./../../config/connection');
// let BookData=data1.bookdata;
const print=(data)=>{
    // const isAuth=(req,res,next)=>{
    //     if(req.session.isAuth){
    //         next()
    //     }
    //     else{
    //         res.redirect("/signup")
    //     }
    // }
router.use(session({
    secret:"key",
    resave:false,
    saveUninitialized:false,
    store:store
}))
router.get("/",isAuth,(req,res)=>{
    db.bookdata.find()
    .then((books)=>{
        // console.log("BK",books);
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

router.get("/dlt/:id",(req,res)=>{
        id=req.params.id;
        db.bookdata.deleteOne({_id:id})
        .then((book)=>{
    
        res.redirect("/books")
    })
})
router.get("/edit/:id",(req,res)=>{
    id=req.params.id;
    db.bookdata.findOne({_id:id}).then((value)=>{
        console.log("value",value);

        res.render("editbook",{id,value,data})
    })
    

})

return router;



}


module.exports=print;
