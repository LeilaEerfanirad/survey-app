

const express = require('express')
const router = express.Router()


//create
const createSurvey = require('./createSurvey')
router.use("/create", createSurvey)

const checkSurveyAccess = require('./checkSurveyAccess')
router.use("/scop", checkSurveyAccess)


const getSurveies = require('./getSurveies')
router.use("/", getSurveies)

const getSingleSurvey = require('./getSingleSurvey')
router.use("/", getSingleSurvey)

const patchSurvey = require('./patchSurvey')
router.use('/', patchSurvey)


const changeQuestionsOrders = require('./changeQuestionsOrders')
router.use('/', changeQuestionsOrders)

const postAnswers = require('./postAnswers')
router.use('/', postAnswers)


module.exports = router