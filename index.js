const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.use(express.json());

const dbconnect = require("./config/database");
dbconnect();

const blog = require("./routes/blog");

app.use("/api/v1", blog);

app.listen(PORT , ()=>{
    console.log(`app is listrning at ${PORT}`);
});



app.get('/', (req, res)=>{
    res.send(`<h1>Blogging app is running successfully</h1>`);
});
