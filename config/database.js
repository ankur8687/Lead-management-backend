const mongoose = require("mongoose");

const  connectDB =  async () => {
    try {

        await mongoose.connect("mongodb+srv://database username:database password@cluster0.6ltd3fc.mongodb.net/?appName=Cluster0");
        console.log("connected to database");
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
};
module.exports = connectDB;