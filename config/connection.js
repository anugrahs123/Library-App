// const mongoClient=require('mongodb').mongoClient;
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/LibraryApp");

const Schema=mongoose.Schema;

const BookSchema=new Schema({
    BookName:String,
    AuthorName:String,
    BookType:String,
    Image:String

});

let bookdata= mongoose.model('BookData',BookSchema);
module.exports=bookdata;