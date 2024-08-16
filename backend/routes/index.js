const express = require('express')
const router = express.Router()


//auth
const signupRout = require("./auth/signup")
router.use("/signup", signupRout)

const loginRout = require("./auth/login")
router.use("/login", loginRout)

//survey
const survey = require('./survey')
router.use("/survey", survey)

//question
const question = require('./question')
router.use("/question", question)

//edge
const edge = require('./edge')
router.use("/edge", edge)





module.exports = router



