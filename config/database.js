const mongoose = require("mongoose");

const  connectDB =  async () => {
    try {

        await mongoose.connect("mongodb+srv://ankur_8687:ankur1234@cluster0.6ltd3fc.mongodb.net/?appName=Cluster0");
        console.log("connected to database");
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
};
module.exports = connectDB;