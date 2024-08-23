const express = require('express')
const { getDataJwt } = require('../../functions/jwtHandler')
const router = express.Router()
const SurveyModel = require('../../models/Survey')
const QuestionModel = require('../../models/Question')
const ChoiceModel = require('../../models/Choice')



router.patch('/:surveyId', async (req, resp) => {

    const { scops, name } = req.body

    const { surveyId } = req.params

    const token = req.headers.authorization

    try {
        const { userId } = await getDataJwt(token)
        if (userId) {

            const survey = await SurveyModel.findOne({ _id: surveyId })


            if (survey) {

                survey.scops = scops
                survey.name = name
                await survey.save()

                return resp.json({
                    status: "success",
                    msg: "نظر ستجی  ویرایش شد!"
                })



            } else {
                return resp.json({
                    status: "error",
                    msg: "نظر ستجی یافت نشد!"
                })
            }

        }



    } catch (e) {
        console.log(e);
    }

})


module.exports = router