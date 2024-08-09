

const express = require('express')
const router = express.Router()


//create
const createSurvey = require('./createSurvey')
router.use("/create", createSurvey)

const getSurveies = require('./getSurveies')
router.use("/", getSurveies)

const getSingleSurvey = require('./getSingleSurvey')
router.use("/", getSingleSurvey)

const patchSurvey = require('./patchSurvey')
router.use('/', patchSurvey)


const changeQuestionsOrders = require('./changeQuestionsOrders')
router.use('/', changeQuestionsOrders)


module.exports = router