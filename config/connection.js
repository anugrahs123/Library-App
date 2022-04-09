const mongoClient=require('mongodb').mongoClient;
const url="mongodb://localhost:27017/LibraryApp"


mongoClient.connect(url,(err)=>{
    console.log(err);
})

module.exports=database;
