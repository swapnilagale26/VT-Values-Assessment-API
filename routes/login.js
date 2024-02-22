const express = require("express");
const { validateSignIn } = require("../controllers/loginController");
const router = express.Router();

router.route("/").get(validateSignIn);

router.route("/").post(validateSignIn)

router.route("/").put((req, res)=>{ 
    
})

router.route("/").delete((req, res)=>{
    
});

module.exports = router;