const express=require('express');
const router=express.Router();
const print=(nav)=>{
const data=[
    {
        name:"Tom & Jerry",
        author:"Joseph Barbera",
        img:"slide1.jpg",
        type:"storywriter"
    },
    {
        name:"Harry Potter",
        author:"J K rowling",
        img:"signup.png",
        type:"poem"
    },
    {
        name:"Pattumayude aadu",
        author:"Basheer",
        img:"profile.png",
        type:"novelist"
    }
    ]


router.get("/",(req,res)=>{
    res.render("books",{nav,data});
})
router.get("/:id",(req,res)=>{
    id=req.params.id;
    res.render("book",{nav,data,id})
})
return router;



}


module.exports=print;
