const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const connectDb = require('./config/dbConnection');
const dotEnv = require("dotenv").config();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");



const app = express();
app.use(cors({
    origin: '*'
}));
const port = process.env.PORT || 5001;

// async function main() {
//     console.log("Entered");
//     await mongoose.connect('mongodb+srv://admin:admin@swapnilcluster.pl3b215.mongodb.net/valuesassessment-backend?retryWrites=true&w=majority');
// }



app.use(bodyParser.json({ limit: '5mb' })); 
connectDb();
app.use("/uploads", express.static("uploads"));

app.use(express.json({ limit: '10mb' }));
app.use("/api/login", require("./routes/login"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/values", require("./routes/valueRoutes"));

app.use(errorHandler);
app.listen(port, ()=>{
    console.log("enter here...")
});

  