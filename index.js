// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

// main().catch(err => console.log(err));

// async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/demo');
// }

// const userSchema = new mongoose.Schema({
//     email: String,
//     password: String
// });

// const User = mongoose.model('User', userSchema);

// const server = express();
// server.use(cors());
// server.use(bodyParser.json());

// server.post('/demo', async (req, res) => {
//     let user = new User();
//     user.email = req.body.email;
//     user.password = req.body.password;
//     const doc = await user.save();
//     res.json(doc);
// })

// server.listen(8080);

