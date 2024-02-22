
const mongoose = require("mongoose");

// it is a image schema which use to fetch  report  image base64  string from database

// we use mixed schema type when how many property are in report object is don't  know
const base64Images = new mongoose.Schema({
    report: {
        type: mongoose.Schema.Types.Mixed,
    }

});
module.exports = mongoose.model("base64Images", base64Images);