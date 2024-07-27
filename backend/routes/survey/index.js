

const express = require('express')
const router = express.Router()


//create
const createSurvey = require('./createSurvey')
router.use("/create", createSurvey)

const getSurveies = require('./getSurveies')
router.use("/", getSurveies)



module.exports = router