const express=require("express");
//init express
const app=new express();
const data={
//     book:[
//     {
//         name:"Tom & Jerry",
//         author:"Joseph Barbera",
//         type:"comedy",
//         img:"slide1.jpg"
//     },
//     {
//         name:"Harry Potter",
//         author:"J K rowling",
//         type:"fantasy",
//         img:"signup.png"
//     },
//     {
//         name:"Pattumayude aadu",
//         author:"Basheer",
//         type:"novel",
//         img:"profile.png"
//     }
// ] ,
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
            link:'addbook',
            title:'Add-Book'
        }
    ]}


const booksRouter=require('./src/routes/booksRoutes')(data);
const authorRouter=require('./src/routes/authorRoutes')(data);
const bookdata=require('./config/connection');
const LogIn=require('./config/connection');
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
app.get("/login/add",(req,res)=>{

   let log={
       email:req.query.email,
       pass:req.query.password
   }
   let log2=LogIn(log);
   log2.save();
   console.log(log2);
   res.redirect('/books')

});
app.get("/signup",(req,res)=>{
    res.render("signup",{data});

});
app.get("/addbook",(req,res)=>{
    res.render("addbook",{data});

});

app.get("/addbook/add",(req,res)=>{
    let item={
        BookName:req.query.BookName,
        AuthorName:req.query.AuthorName,
        BookType:req.query.BookType,
        BookYear:req.query.BookYear,
        Image:req.query.Image
    }
    console.log(item);
   var book= bookdata(item);
    book.save();
    res.redirect('/books')

});


//listen on a port

app.listen(8000,()=>{
    console.log(`server starting at 8000`);
});
