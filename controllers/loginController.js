const asyncHandler = require("express-async-handler");

const validateSignIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all required fields");
  }
});

module.exports = { validateSignIn };
