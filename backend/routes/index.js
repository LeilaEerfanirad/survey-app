const express = require('express')
const router = express.Router()

const signupRout = require("./auth/signup")
router.use("/signup", signupRout)




module.exports = router



