const express = require('express')
const router = express.Router()
const SurveyModel = require('../../models/Survey')



router.post("/:surveyId/change-orders", async (req, resp) => {


    const { surveyId } = req.params

    const { prior_questionId, questionId } = req.body

    try {
        const survey = await SurveyModel.findOne({ _id: surveyId }).populate('questions')

        const from = survey.questions.findIndex(item => item._id.toString() === questionId)
        const to = survey.questions.findIndex(item => item._id.toString() === prior_questionId)

        console.log(from, "===from");
        console.log(to, "===to");



        const [element] = survey.questions.splice(from, 1);

        survey.questions.splice(to, 0, element);

        await survey.save()

        return resp.json(survey.questions)




    } catch (e) {
        console.log(e);

    }



    return resp.json(req.params)



})



module.exports = router
