// const mongoClient=require('mongodb').mongoClient;
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/LibraryApp");

const Schema=mongoose.Schema;

const BookSchema=new Schema({
    BookName:String,
    AuthorName:String,
    BookType:String,
    BookYear:Number,
    Image:String

});
// const LogInSchema=new Schema({
//     Email:String,
//     Password:String
// })
// let LogIn= mongoose.model('LogIn',LogInSchema);
// module.exports=LogIn;

let bookdata= mongoose.model('BookData',BookSchema);
module.exports=bookdata;