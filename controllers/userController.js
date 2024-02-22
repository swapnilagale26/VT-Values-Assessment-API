const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const { emailSend } = require("./valueController");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  const lastRecord = await User.find().sort({ count: -1 }).limit(1);

  const resultCount = (lastRecord?.[0]?.count ?? 0) + 1;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    count: resultCount,
    // role: role || UserRoles.USER,
  });

  console.log(`User created ${user}`);
  if (user) {
    let result = await emailSend({
      message: {
        from: "Rise & Thrive <sagarmp7731@gmail.com>", //  this   is actually see in result mail you can check it
        to: `${user.username} <${user.email}>`, // list of receivers
        subject:
          "Embark on a Journey of Self-Discovery with the AstroValues Alignment Assessment!",
        template: "emailSignUp",
        context: {
          text: `Dear ${user.username},`,
          paragraph: `As you stand at the threshold of this journey's end, pause, and look back at the path you've traversed. The archetypes and values you've encountered are like stars in your personal constellation, each shining light on different facets of your being. They offer a map to navigate the complexities of your personality and aspirations.`,
          username: user.username,
          message:
            " We provide you test result in form of pdf so please download it form attchment",
          url: `${process.env.appUrl}dashboard`,
        },
      },
    });
    res
      .status(201)
      .json({
        _id: user.id,
        email: user.email,
        role: user.role,
        username: user.username,
        mailStatus: result,
      });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user" });
});


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  //compare password with hashedpassword
  //console.log(password, user);
  if (user && (await bcrypt.compare(password, user.password))) {
    console.log("Enter inn ");
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          address: user.address,
          mobile: user.mobile,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "15m" }
    );
    console.log("Enter out ddd", accessToken);
    res.status(200).json({
      accessToken,
      email: user.email,
      username: user.username,
      role: user.role,
      id: user._id,
    });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

// get user  Report list
const getUserReport = asyncHandler(async (req, res) => {
  console.log(req.query, req.params, req.body, "body");
  let userReportList = await User.find({ email: req.params.email });
  console.log(userReportList, "userReportlist");
  if (userReportList) {
    res.status(201).json(userReportList);
  } else {
    res.status(400);
    throw new Error("user data is not valid");
  }
});

// get  all user details
const getAllUserDetails = asyncHandler(async (req, res) => {
  let userDetails;
  if(req.params.endIndex!="All"){
  userDetails = await User.find(
      {
        role: { $ne: "admin" },
      }, // filter data
      { email: 1, username: 1, report: 1, count: 1, role: 1 } // what field you want from each entry
    )
      .skip(req.params.startIndex) // how much entries we want to skip like first 10 or first 40  so
      .limit(req.params.endIndex); // after skiping how main entries you want want like 5 ,10,25

  }
  else{
    userDetails = await User.find(
      {
        role: { $ne: "admin" },
      }, // filter data
      { email: 1, username: 1,count:1} // what field you want from each entry
    )
// console.log(userDetails)
  }
 


  if (userDetails) {
    res.status(201).json(userDetails);
  } else {
    res.status(401);
    throw new Error("user data is not valid");
  }
});

// delete user by request of admin
const deleteUser = asyncHandler(async (req, res) => {
  let email = req.params.email;
  console.log("req", email);
  const result = await User.deleteOne({ email: email });

  if (result) {
    res.status(201).json("request  successfully excuted");
  } else {
    res.status(401);
    throw new Error("user data is not valid");
  }
});

// get User Count
const getUserCount = asyncHandler(async (req, res) => {
  const count = await User.countDocuments( {
    role: { $ne: "admin" },
  },); //

  if (count) {
    res.status(201).json(count);
  } else {
    res.status(400);
    throw new Error("user data is not valid");
  }
});

// generate time stamp
const generateExpirationTimestamp = (hour) => {
  const now = new Date();
  now.setHours(now.getHours() + hour);
  return now.getTime();
};

const getuserReportDownload = asyncHandler(async (req, res) => {
  const params = req.query;
  console.log(params, 111);
  let currentTimeStamp = generateExpirationTimestamp(0);

  // condition to validate  link expired after 48 hours
  if (currentTimeStamp <= parseFloat(params.expire)) {
    // in path we dont need to define entried path we only need to define path related to main folder http://localhost:5000/uploads/pdfpath only
    // need to define upload/pdfpath
    let path = `uploads/${params.pdfAddress}`;
    //let path='http://localhost:5000/uploads/pdfFile-1702273551492-167298224.pdf';
    // we send request with download in which we
    console.log(path);
    res.download(path, "Your_Report.pdf", (err) => {
      if (err) {
        // Handle errors, e.g., log the error or send an error response
        console.error("Error sending file:", err);
        res.status(500).send("Internal Server Error");
      }
    });
  } else {
    // Return an error or redirect to an expired link page
    res.status(403).send("This download link has expired.");
  }
  //  this is way send file
});

// update  user details
const updateDetail = asyncHandler(async (req, res) => {
  let detail = req.body;

  // both having same meaning , second have short cut symbol
  // {field: {$eq: value}}
  // or  
  // {field: value}

  let existEntry = await User.findOne({
    email: detail.email,
    _id: { $ne: req.body.id },
  });
  if (existEntry) {
    res.status(201).json({ error: "not resolve" });
  } else {
    let userdetails = await User.updateOne(
      { _id: req.body.id },
      {
        $set: {
          email: detail.email,
          username: detail.username,
        },
      }
    );
    console.log(userdetails, "userdetails");

    res.status(201).json(userdetails);
  }
});

// update password
const updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.body.id });

  let passwordCompare = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );

  //compare password with hashedpassword
  if (passwordCompare) {
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    console.log(passwordCompare, req.body.oldPassword, "resolve");

    let userdetails = await User.updateOne(
      { _id: req.body.id },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    res.status(201).json("Password update sucessfully ");
  } else {
    console.log(passwordCompare, req.body.oldPassword, "reject");

    res.status(201).json({ error: "Old Password is not matching" });
  }
});

//user account is exist or not   and send email for forget password
const forgetPassWordMail = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  //compare password with hashedpassword
  if (user) {
    let expire = generateExpirationTimestamp(0.05);
    console.log("resolve3");
    let result = await emailSend({
      message: {
        from: "Rise & Thrive <sagarmp7731@gmail.com>", //  this   is actually see in result mail you can check it
        to: `${user.username} <${req.body.email}>`, // list of receivers
        subject: "Password Reset Link - Valid for 3 Minutes Only",
        template: "emailForgetPassword",
        context: {
          text: `Dear ${user.username},`,
          url: `${process.env.appUrl}forgetPass/${req.body.email}/${expire}`,
        },
      },
    });
    console.log("resolve4");

    res.status(201).json("Password update sucessfully ");
  } else {
    console.log(passwordCompare, req.body.oldPassword, "reject");

    res.status(201).json({ error: "Email is not registered" });
  }
});

// save new password  for forget password save
const forgetPasswordSave = asyncHandler(async (req, res) => {
  let detail = req.body;
  console.log(detail);
  const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
  // update user password
  let userdetails = await User.updateOne(
    { email: detail.email },
    {
      $set: {
        password: hashedPassword,
      },
    }
  );
  if (userdetails.acknowledged) {
    console.log("userdetailstrue");
    res.status(201).json(userdetails);
  } else {
    console.log("userdetailsFalse");

    res.status(201).json({ error: "password is not updated" });
  }
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  getUserReport,
  getAllUserDetails,
  deleteUser,
  getUserCount,
  getuserReportDownload,
  updateDetail,
  updatePassword,
  forgetPassWordMail,
  forgetPasswordSave,
};
