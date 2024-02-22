const express = require("express");
const {
  registerUser,
  currentUser,
  loginUser,
  getUserReport,
  getAllUserDetails,
  deleteUser,
  getUserCount,
  getuserReportDownload,
  updateDetail,
  updatePassword,
  forgetPassWordMail,
  forgetPasswordSave
  
} = require("../controllers/userController");

const {pdfGenerationController}= require("../controllers/pdfGenerationController")
const validateToken = require("../middlewares/validateTokenHandler");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

router.get("/userReport/:email" , getUserReport);

router.get("/userDetails/:startIndex/:endIndex" , getAllUserDetails);

router.post("/userDelete/:email" ,deleteUser);

router.get("/userCount" , getUserCount);

router.get("/userReportDownload" , getuserReportDownload);

router.post("/updatePassword",updatePassword);

router.post("/updateDetail",updateDetail);

router.post("/ForgetPassWordMail",forgetPassWordMail);

router.post("/forgetPasswordSave",forgetPasswordSave);

router.post("/generatePdfSave",pdfGenerationController);









module.exports = router;

