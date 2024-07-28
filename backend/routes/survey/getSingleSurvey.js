const express = require('express')
const router = express.Router()
const SurveyModel = require('../../models/Survey')
const UserModel = require('../../models/User')
const { getDataJwt } = require('../../functions/jwtHandler')



router.get("/:surveyId", async (req, resp) => {

    const { surveyId } = req.params

    const token = req.headers.authorization

    try {

        const { userId } = await getDataJwt(token)

        const survey = await SurveyModel.findOne({ _id: surveyId }).populate('questions')

        // const survey = user.surveies.find(item => item._id.toString() === surveyId)

        return resp.json(survey)


    } catch (e) {
        console.log(e);
    }
})



module.exports = router