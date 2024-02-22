const express = require("express");
const router = express.Router();
const {
  addValue, upload,getAllValue,userReportSave,getBase64Image
} = require("../controllers/valueController");
const validateToken = require("../middlewares/validateTokenHandler");


 router.post("/add", upload.single('image'),addValue);

 //router.post("/add", addValue);

// for getting all result of value schema
 router.get("/getAllValue", getAllValue);

 router.post("/reportSave",userReportSave);

 router.get('/Base64Image',getBase64Image)

module.exports = router;
