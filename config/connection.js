const mongoClient=require("mongodb").MongoClient;
const state={
    db:null,

};
module.exports.connect=function(done){
    const uri= "mongodb://localhost:27017";
    const dbname="Library";

    mongoClient.connect(uri,{useUnifiedTopology:true},(err,data)=>{
        if(err){
            return done(err);
        }
        state.db=data.db(dbname);
        done();

        });
   
}
module.exports.get=function(){
    return state.db;
};