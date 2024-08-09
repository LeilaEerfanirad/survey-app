const express = require('express')

const router = express.Router()



//patch question
const patchQuestion = require('./patchQuestion')
router.use("/", patchQuestion)



module.exports = router
