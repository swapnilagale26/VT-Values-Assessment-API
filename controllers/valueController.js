const asyncHandler = require("express-async-handler");
const multer = require("multer");
const path = require("path");
const Value = require("../models/valueModels");
const users = require("../models/userModels");
const base64Images = require("../models/ImageModels");
const fs = require("fs");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const hbs = require("nodemailer-express-handlebars");
const pdfGenerationController = require("./pdfGenerationController");

//Multer configuration
let filenamesave = null;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    filenamesave = file.fieldname + "-" + uniqueSuffix + fileExtension;
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage: storage });
//@desc add a value
//@route POST /api/values/add
//@access public
const addValue = asyncHandler(async (req, res) => {
  const { name, description, reportDescription } = req.body;

  const {
    sun,
    moon,
    mercury,
    venus,
    mars,
    jupiter,
    saturn,
    chiron,
    uranus,
    neptune,
    pluto,
    eris,
  } = req.body.archetypes;

  console.log(req.file);
  //functionality for document means image or pdf in base64  to server

  //   if (req.file) {
  //     const reader = new FileReader();

  //     reader.onload = function () {
  //       console.log("inside")

  //       // The result property contains the base64-encoded image data
  //       const base64ImageData = reader.result;

  //   const dataUrlRegExp = /^data:image\/\w+;base64,/;
  //   const base64Data = base64ImageData.replace(dataUrlRegExp, "");
  //   // declare a binary buffer to hold decoded base64 data
  //   const imageBuffer = Buffer.from(base64Data, "base64");
  //   const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

  //   // write the buffer to the local file system synchronously
  //   // Use asynchronous file write
  //   const filePath = `../uploads/${uniqueSuffix}.txt`
  //   fs.writeFileSync(path.join(__dirname, filePath), imageBuffer, (err) => {
  //     if (err) {
  //       console.error('Error writing file:', err);
  //     } else {
  //       console.log('File written successfully!');
  //     }
  //   });
  // };

  // reader.readAsDataURL(req.file);
  // }

  const imagePath = req.file ? req.file.path : "";

  console.log(req.body.archetype, "imagePath");
  if (!name || !description || !req.file) {
    res.status(400);
    console.log(name);
    throw new Error("All fields, including the image, are mandatory!");
  }
  const valueAvailable = await Value.findOne({ name });
  if (valueAvailable) {
    res.status(400);
    throw new Error("Value name should be unique!");
  }

  //   const hashedPassword = await bcrypt.hash(password, 10);
  const value = await Value.create({
    name,
    description,
    reportDescription,
    archetypes: {
      sun,
      moon,
      mercury,
      venus,
      mars,
      jupiter,
      saturn,
      chiron,
      uranus,
      neptune,
      pluto,
      eris,
    },
    image: filenamesave,
  });
  filenamesave = null;
  // const result= await Value.deleteMany({});

  // console.log(`Value created ${value}`);
  if (value) {
    res.status(201).json({ _id: value.id, name: value.name });
  } else {
    res.status(400);
    throw new Error("Value data is not valid");
  }
  res.json({ message: "Add Value" });
});

// it use to get all result for value schema
const getAllValue = asyncHandler(async (req, res) => {
  const result = await Value.find().sort({ name: 1 });
  if (result) {
    res.status(201).json({ result });
  } else {
    res.status(400);
    throw new Error("Value data is not valid");
  }
});

// save the user report  array
const userReportSave = asyncHandler(async (req, res) => {
  let user = await users.find({ email: req.body.email });

  let resultReportArr = user[0].report;

  resultReportArr.push(req.body.filenamesave);

  const updatedDocument = await users.updateOne(
    { email: req.body.email },
    {
      $set: {
        report: resultReportArr,
      },
    }
  );
  if (updatedDocument) {
    let timeStampAfter = generateExpirationTimestamp(48);
    let emailResult = await emailSend({
      message: {
        from: "Ventura eLearning Global <sagarmp7731@gmail.com>", //  this   is actually see in result mail you can check it
        to: `${user[0].username} <${req.body.email}>`, // list of receivers
        subject: "Your AstroValues Alignment Assessment Report Is Ready!",
        template: "emailReport",
        context: {
          text: `Dear ${user[0].username},`,
          username: user[0].username,
          message:
            " We provide you test result in form of pdf so please download it form attchment",
          url: `${process.env.serverUrl}api/users/userReportDownload?pdfAddress=${req.body.filenamesave}&expire=${timeStampAfter}`,
        },
      },
    });

    res.status(201).json({ emailResult });
  } else {
    res.status(400);
    throw new Error("Value data is not valid");
  }
});

// it is use  to create time stamp   and hours is use to define form current time to after how many hours we want time stamp
const generateExpirationTimestamp = (hour) => {
  const now = new Date();
  now.setHours(now.getHours() + hour);
  return now.getTime();
};

// email send functionality

const emailSend = async ({ email, pdfAddress, username, message }) => {
  // Create a SMTP transporter object
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.pass,
    },
  });

  //  we creates this because we want to send dynamic mail(username is  alway changing)  with custom html and css for that we
  // use the 'nodemailer-express-handlebars' liabray and also define email.handlebars where i define my  html and to pass data to
  // html we use context object  of message variable.
  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      //partialsDir: path.resolve("../Value-Assessment-API/Email/views"),
      partialsDir: path.resolve("Email/views"),
      defaultLayout: false,
    },
    // viewPath: path.resolve("../Value-Assessment-API/Email/views"),
    viewPath: path.resolve("Email/views"),
    extName: ".handlebars",
  };

  //we define that for transporter of email we use  handlebarOptions  as middle ware and   complie is  phase in which we want to use that  middleware
  transporter.use("compile", hbs(handlebarOptions));

  let timeStampAfter = generateExpirationTimestamp(48);

  // the template property in the message object is used to specify the name of the Handlebars template that will be used to render the email content.
  // Message object

  // let resultMessage=message==`messageReport`?messageReport:messageSignUp;
  // console.log(resultMessage);

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("Error occurred. " + err.message);
      return false;
    } else {
      console.log("Message sent: %s", info.messageId);
      return true;
    }
  });
};

// get image base64 string   object   for report image according to required
const getBase64Image = asyncHandler(async (req, res) => {
  let result = await base64Images.find();
  if (result) {
    res.status(201).json(result);
  } else {
    res.status(400);
    throw new Error("Images  is not availables");
  }
});

module.exports = {
  addValue,
  upload,
  getAllValue,
  userReportSave,
  emailSend,
  getBase64Image,
};
