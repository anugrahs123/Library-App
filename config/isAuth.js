
const session=require('express-session')
const db=require('./connection2');
const mongoDBSession=require('connect-mongodb-session')(session)

const isAuth=(req,res,next)=>{
    if(req.session.isAuth){
        console.log("sess",req.session);
        next()
    }
    else{
        res.redirect("/signup")
    }
}

const store=new mongoDBSession({
    uri:db.data,
    collection:"mySession"

})


module.exports={isAuth,store}