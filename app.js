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
        },
       
      
        {
            link:'addauthor',
            title:'Add-Author'
        },
        {
            link:'logout',
            title:'Logout'
        }
    ]}


const booksRouter=require('./src/routes/booksRoutes')(data);
const authorRouter=require('./src/routes/authorRoutes')(data);
const sighupRouter=require('./src/routes/signupRoutes');
// const bookdata=require('./config/connection');
// const authordata=require('./config/connection2');
const data1=require('./config/connection2')
// const LogIn=require('./config/connection');
// const data1=require('./config/connection');
// let bookdata1=data1.bookdata;
// let LogIn=data1.LogIn;
app.use(express.static('./public'))
app.use("/books",booksRouter);
app.use("/authors",authorRouter);
app.use("/signup",sighupRouter);
app.use(express.urlencoded({ extended: true })) ;
// app.METHOD(PATH,HANDLER); 
app.set('view engine','ejs');
app.set('views','./src/views')

//create route handler
app.get("/",(req,res)=>{
    res.render("index",{books:['name1','name2'],title:'new title'});

});
app.get('/login',(req,res)=>{
    res.render("login");
})
app.get('/logout',(req,res)=>{
    res.redirect("/login");
})
app.post("/login/add",(req,res)=>{
    let m=req.body.email;
    let n=req.body.password;
    data1.Userdata.find()
    .then((e)=>{
        for(let i=0;i<e.length;i++){
        if(m===e[i].Email && n===e[i].Password){
            res.redirect('/books')
            // res.json({message:"okay"})
        }
        // else{
          
        //     res.redirect('/login')
        //     // res.json({message:"not okay"})

        // }
        // res.send('we');
        console.log(e);
        console.log(req.body.email);
    }
        
    })

});

app.get("/addbook",(req,res)=>{
    res.render("addbook",{data});

});
app.get("/editbook",(req,res)=>{
    res.render("editbook",{data});

});
app.post("/editbook/add",(req,res)=>{
    let item={
        BookName:req.body.BookName,
        AuthorName:req.body.AuthorName,
        BookType:req.body.BookType,
        BookYear:req.body.BookYear,
        Image:req.body.Image
    }

    data1.bookdata.updateOne({BookName:item.BookName},
        { $set:{
            BookName:req.body.BookName,
            AuthorName:req.body.AuthorName,
            BookType:req.body.BookType,
            BookYear:req.body.BookYear,
            Image:req.body.Image
            
             }} )
    .then((e)=>{
        console.log(e);
        
        res.redirect('/books');
        console.log(item);
    })

});
app.get("/addauthor",(req,res)=>{
    res.render("addauthor",{data});

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
   var book= data1.bookdata(item);
    book.save();
    res.redirect('/books')

});

app.post("/addbook/addauthor",(req,res)=>{
    let item={
        AuthorName:req.body.AuthorName,
        AuthorType:req.body.AuthorType,
        AuthorImage:req.body.AuthorImage
    }
    console.log(item);
   var author= data1.authordata(item);
    author.save();
    console.log(item);
    res.redirect('/books')

});



//listen on a port

app.listen(8000,()=>{
    console.log(`server starting at 8000`);
});
