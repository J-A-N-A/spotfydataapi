const mongoose=require('mongoose');
const Schema=new mongoose.Schema({
   artwork:{
        type:String,
    },
    songname:{
        type:String,
    },
    date:{
        type:Date,
    },
    artist:{
        type:String ,
    },
    artistdate:{
        type:String ,
    },
    artistbio:{
        type:String,
    },
    rating:{
        type:Number,
   }
    
})
module.exports=mongoose.model('playlist',Schema);