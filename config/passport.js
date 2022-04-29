const LocalStrategy=require('passport-local').Strategy
const bcrypt=require('bcrypt')



const initialize=(passport,getUserByEmail,getUserById)=>{
    const authenticateUser=async(email,password,done)=>{
        const user=getUserByEmail(email)
        console.log("C User",user);
        console.log("C pass",password);
        if(user==null){
            console.log("user not HERE");
            return done(null,false,{message:"No User Found"})
        }
        try{
            if(await bcrypt.compare(password,user.password)){
                return done(null,user)
            }
            else{
                return done(null,false,{message:"Password Not Match"})
            }

        }
        catch(e){
            console.log("catched");
            return done(e)

        }

    }
    passport.use(new LocalStrategy({usernameField:'email'},authenticateUser))

    passport.serializeUser((user,done)=>{
        return done(null,user.id)
    })
    passport.deserializeUser((id,done)=>{
        return done(null,getUserById(id))
    })
}

module.exports=initialize