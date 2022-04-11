// const mongoClient=require('mongodb').mongoClient;
const mongoose=require("mongoose");
// mongoose.connect("mongodb://localhost:27017/LibraryApp");
mongoose.connect("mongodb+srv://libraryapp:libraryapp@clusterlibrary.5fslb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

const Schema=mongoose.Schema;


const AuthorSchema=new Schema({
    
    AuthorName:String,
    AuthorType:String,
    AuthorImage:String

});
const BookSchema=new Schema({
    BookName:String,
    AuthorName:String,
    BookType:String,
    BookYear:Number,
    Image:String

});
const UserSchema=new Schema({
    Email:String,
    Password:String,
    Address:String,
    Address2:String,
    City:String,
    State:String,
    Zip:String
  

});


let db= {
    authordata:mongoose.model('AuthorData',AuthorSchema),
    bookdata:mongoose.model('BookData',BookSchema),
    Userdata:mongoose.model('UserData',UserSchema)

}
module.exports=db;