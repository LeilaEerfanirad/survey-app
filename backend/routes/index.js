const express = require('express')
const router = express.Router()


//auth
const signupRout = require("./auth/signup")
router.use("/signup", signupRout)

const loginRout = require("./auth/login")
router.use("/login", loginRout)




module.exports = router



