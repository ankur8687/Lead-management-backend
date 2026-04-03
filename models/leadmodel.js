const mongoose = require("mongoose");

const followUpschema = new mongoose.Schema({
    date : {
        type : Date,
        required : true
    },

    note : {
        type : String
    },
    status : {
        type : String,
        enum : ["pending" , "done"],
        default : "pending"
    }
});

const leadSchema  = new mongoose.Schema({
     name : {
        type : String,
        required : true
     },

     phone :{
        type : String, 
        required : true,
        uniqiue : true
     },

     project :{
        type : String,
     },

     source : {
        type : String,
     },

     budget : Number,
     intent :{
        type : String,
        enum : ["low","medium","high"]
     },

     status :{
        type : String ,
        enum : ["new", "contacted" , "qualified" , "closed"],
        default : "new"
     },



     followUps : [followUpschema],
     nextFollowUpDate : Date
    },
    {timestamps : true});
    module.exports = mongoose.model("Lead", leadSchema);


