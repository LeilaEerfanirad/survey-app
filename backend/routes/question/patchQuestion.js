const express = require('express')
const router = express.Router()
const SurveyModel = require('../../models/Survey')



router.get("/:surveyId/question/:questionId/:priorQuestionId", async (req, resp) => {


    const { questionId, surveyId, priorQuestionId } = req.params

    // const { prior_questionId } = req.body

    try {
        const survey = await SurveyModel.findOne({ _id: surveyId }).populate('questions')

        const targetQuestion = survey.questions.find(item => item._id == questionId)

        const from = survey.questions.findIndex(item => item._id == questionId)
        const to = survey.questions.findIndex(item => item._id == priorQuestionId) - 1


        survey.questions.splice(from, 1)

        survey.questions.splice(to, 0, targetQuestion);






        return resp.json(survey.questions)




    } catch (e) {
        console.log(e);

    }



    return resp.json(req.params)



})



module.exports = router
