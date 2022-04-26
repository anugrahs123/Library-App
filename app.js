require('dotenv').config
const express=require("express");
const bcrypt=require('bcrypt')
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

const {isAuth,store}=require('./config/isAuth')
    // const isAuth=(req,res,next)=>{
    //     if(req.session.isAuth){
    //         next()
    //     }
    //     else{
    //         res.redirect("/signup")
    //     }
    // }
const session=require('express-session')
const booksRouter=require('./src/routes/booksRoutes')(data);
const authorRouter=require('./src/routes/authorRoutes')(data);
const sighupRouter=require('./src/routes/signupRoutes');
// const bookdata=require('./config/connection');
// const authordata=require('./config/connection2');
const db=require('./config/connection2');
const mongoDBSession=require('connect-mongodb-session')(session)

// const store=new mongoDBSession({
//     uri:db.data,
//     collection:"mySession"

// })
// const LogIn=require('./config/connection');
// const data1=require('./config/connection');
// let bookdata1=data1.bookdata;
// let LogIn=data1.LogIn;
app.use(express.static('./public'))
app.use("/books",booksRouter);
app.use("/authors",authorRouter);
app.use("/signup",sighupRouter);
app.use(express.urlencoded({ extended: true })) ;
app.use(session({
    secret:"key",
    resave:false,
    saveUninitialized:false,
    store:store

}))

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
    req.session.destroy((err)=>{
        if(err){
            throw err
        }

        res.redirect("/login");
    })
})
app.post("/login/add",(req,res)=>{
    let m=req.body.email;
    let n=req.body.password;
    db.Userdata.find()
    .then((user)=>{
        console.log(user);
        for(let i=0;i<user.length;i++){
            console.log(n);
            
            console.log("oka",user[i].Password);
            bcrypt.compare(n,user[i].Password,(err,data)=>{
                if(data){

                    if(m===user[i].Email ){
                        req.session.isAuth=true
                        res.redirect('/books')
                        // res.json({message:"okay"})
                    }
               
                    else{
                        console.log("else");
                      
                        // res.redirect('/login')
                        // res.json({message:"not okay"})
            
                    }
                }
                else{
                    console.log("else else");
                }

            })
        // res.send('we');
        //console.log(e);
        console.log(req.body.email);
    }
        
    })

});

app.get("/addbook",isAuth,(req,res)=>{
    res.render("addbook",{data});

});
app.get("/editbook",isAuth,(req,res)=>{
    res.render("editbook",{data});

});
app.post("/editbook/add",(req,res)=>{
    const BookID=req.body.BookID;
    let item={
        BookName:req.body.BookName,
        AuthorName:req.body.AuthorName,
        BookType:req.body.BookType,
        BookYear:req.body.BookYear,
        Image:req.body.Image
    }

    db.bookdata.updateOne({_id:BookID},
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
   var book= db.bookdata(item);
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
   var author= db.authordata(item);
    author.save();
    console.log(item);
    res.redirect('/books')

});



//listen on a port

app.listen(8000,()=>{
    console.log(`server starting at 8000`);
});
