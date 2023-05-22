const mongoose = require("mongoose");

require("dotenv").config();

const dbconnect = () =>{
    mongoose.connect(process.env.DATABASE_URL , {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        useNewUrlParser: true,
		useUnifiedTopology: true,
    })
    .then(()=>{console.log("connectiom is success");})
    .catch((e)=>{console.log("erorr in connection");})
};

module.exports = dbconnect;