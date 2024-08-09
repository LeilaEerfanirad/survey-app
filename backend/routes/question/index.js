const express = require('express')

const router = express.Router()



//post question
const postQuestion = require('./postQuestion')
router.use("/", postQuestion)

//patch question
const patchQuestion = require('./patchQuestion')
router.use("/", patchQuestion)

//get question
const getQuestion = require('./getQuestion')
router.use("/", getQuestion)





module.exports = router
