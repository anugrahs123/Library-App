const express=require("express");
//init express
const app=new express();
const data={
    book:[
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
] ,
nav:[
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
    ]}


const booksRouter=require('./src/routes/booksRoutes')(data);
const authorRouter=require('./src/routes/authorRoutes')(data);
app.use(express.static('./public'))
app.use("/books",booksRouter);
app.use("/authors",authorRouter);
// app.METHOD(PATH,HANDLER); 
app.set('view engine','ejs');
app.set('views','./src/views')

//create route handler
app.get("/",(req,res)=>{
    res.render("index",{data,books:['name1','name2'],title:'new title'});

});
app.get("/login",(req,res)=>{
    res.render("login",{data});

});
app.get("/signup",(req,res)=>{
    res.render("signup",{data});

});
app.get("/addbook",(req,res)=>{
    res.render("addbook",{data});

});


//listen on a port

app.listen(8000,()=>{
    console.log(`server starting at 8000`);
});
