const express = require('express')
const router = express.Router()
const QuestionModel = require('../../models/Question')
const ChoiceModel = require('../../models/Choice')
const SurveyModel = require('../../models/Survey')



router.post("/", async (req, resp) => {

    const { type, surveyId } = req.body

    // return resp.json(req.body)

    try {

        const survey = await SurveyModel.findOne({ _id: surveyId })

        switch (type) {
            case 0:

                break;
            case 1:

                break;
            case 2: {
                const newQuestion = await QuestionModel.create(req.body)
                survey.questions = [...survey.questions, newQuestion._id]
                survey.save()
                return resp.json(newQuestion)
            }
            case 3: {
                const { choices, ...res } = req.body

                const savedChoices = await ChoiceModel.insertMany(choices);

                const choiceIds = savedChoices.map(choice => choice._id);


                const newQuestion = await QuestionModel.create({
                    ...res,
                    choices: choiceIds
                });

                survey.questions = [...survey.questions, newQuestion._id]
                await newQuestion.save()
                await survey.save()

                return resp.json(req.body)


            }

                break;
            default:
                break;
        }

    } catch (e) {
        console.log(e);

    }





})


module.exports = router