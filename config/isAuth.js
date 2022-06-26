
const session=require('express-session')
const db=require('./connection2');
const mongoDBSession=require('connect-mongodb-session')(session)

const isAuth=(req,res,next)=>{
    if(req.session.isAuth){
        console.log("sess",req.session);
        next()
    }
    else{
        res.redirect("/login")
    }
}

const isAdmin=(req,res,next)=>{
    if(req.session.isAdmin){
        next()
    }
    else{
        res.send("Unauthorised - LogIn with ADMIN credentials!!!")
    }
}

const store=new mongoDBSession({
    uri:db.data,
    collection:"mySession"

})


module.exports={isAuth,store,isAdmin}