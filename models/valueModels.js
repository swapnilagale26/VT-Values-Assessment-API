const mongoose = require("mongoose");

// const valueSchema = mongoose.Schema(
//   {
//     valueName: {
//       type: String,
//       required: [true, "Please add the Value Name"],
//       unique: [true, "This value is already added"],
//     },
//     description: {
//       type: String,
//       required: [true, "Please add the value desciprtion"],
//     },
//     sun: {
//       type: Number,
//       required: [true, "Please add the user sun value"],
//     },
//     moon: {
//       type: Number,
//       required: [true, "Please add the moon value"],
//     },
//     mercury: {
//       type: Number,
//       required: [true, "Please add the mercury value"],
//     }
//   },
// );


const valueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  reportDescription: {
    type: String,
    required: true
  },
  archetypes: {
    sun: {
      type: Number,
      required: true
    },
    moon: {
      type: Number,
      required: true
    },
    mercury: {
      type: Number,
      required: true
    },
    venus: {
      type: Number,
      required: true
    },
    mars: {
      type: Number,
      required: true
    },
    jupiter: {
      type: Number,
      required: true
    },
    saturn: {
      type: Number,
      required: true
    },
    chiron: {
      type: Number,
      required: true
    },
    uranus: {
      type: Number,
      required: true
    },
    neptune: {
      type: Number,
      required: true
    },
    pluto: {
      type: Number,
      required: true
    },
    eris: {
      type: Number,
      required: true
    },
  },
  image: {
    type: String, // Assuming the image will be stored as a file path
    required: true,
  },
});

// this line is basically use to create collection it  excuteded when we run npm start
// we specify that our collection name in mongo db is Value but mongo db  follow some rule for collection name
//use the mongoose.model() function to create a model, the first parameter you provide is the singular name of the collection that will be created in the MongoDB database.
// the collection name is automatically converted to lowercase and pluralized by Mongoose. 
module.exports = mongoose.model("Value", valueSchema);  // so collection actual name is "values"