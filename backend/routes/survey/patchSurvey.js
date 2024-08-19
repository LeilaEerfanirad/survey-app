const express = require('express')
const { getDataJwt } = require('../../functions/jwtHandler')
const router = express.Router()
const SurveyModel = require('../../models/Survey')
const QuestionModel = require('../../models/Question')
const ChoiceModel = require('../../models/Choice')



router.patch('/:surveyId', async (req, resp) => {

    const { type, questionId } = req.body

    const { surveyId } = req.params

    const token = req.headers.authorization

    try {
        const { userId } = await getDataJwt(token)
        if (userId) {

            const survey = await SurveyModel.findOne({ _id: surveyId })


            if (survey) {

                if (questionId) {

                    let question = await QuestionModel.findById({ _id: questionId })

                    Object.assign(question, req.body);

                    await question.save()

                    return resp.json({
                        statue: "success",
                        msg: "سوال ذخیره شد"
                    })


                } else {


                    switch (type) {
                        case 0:
                            {

                            }

                        case 2:
                            {

                                const newQuestion = await QuestionModel.create(req.body)
                                survey.questions = [...survey.questions, newQuestion._id]
                                survey.save()

                                return resp.json({
                                    statue: "success",
                                    msg: "سوال ذخیره شد"
                                })
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
                        default:
                            break;
                    }

                }

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