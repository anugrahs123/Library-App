const express=require("express");
//init express
const app=new express();

const nav=[
    {
        link:'books',
        title:'Books'
    },
    {
        link:'authors',
        title:'Authors'
    },
    {
        link:'login',
        title:'Login'
    },
    {
        link:'signup',
        title:'Signup'
    },
    {
        link:'addbook',
        title:'Add-Book'
    }
    
    
    
    
    
]
const data=[
    {
        name:"Tom & Jerry",
        author:"Joseph Barbera",
        img:"slide1.jpg"
    },
    {
        name:"Harry Potter",
        author:"J K rowling",
        img:"signup.png"
    },
    {
        name:"Pattumayude aadu",
        author:"Basheer",
        img:"profile.png"
    }
    ]


const booksRouter=require('./src/routes/booksRoutes')(nav);
const authorRouter=require('./src/routes/authorRoutes')(nav);
app.use(express.static('./public'))
app.use("/books",booksRouter);
app.use("/authors",authorRouter);
// app.METHOD(PATH,HANDLER); 
app.set('view engine','ejs');
app.set('views','./src/views')

//create route handler
app.get("/",(req,res)=>{
    res.render("index",{nav,books:['name1','name2'],title:'new title'});

});
app.get("/login",(req,res)=>{
    res.render("login",{nav});

});
app.get("/signup",(req,res)=>{
    res.render("signup",{nav});

});
app.get("/addbook",(req,res)=>{
    res.render("addbook",{nav});

});


//listen on a port

app.listen(8000,()=>{
    console.log(`server starting at 8000`);
});
