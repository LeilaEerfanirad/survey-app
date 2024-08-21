const express = require('express')
const router = express.Router()
const QuestionModel = require('../../models/Question')
const ChoiceModel = require('../../models/Choice')
const SurveyModel = require('../../models/Survey')
const { Types } = require('mongoose')



router.post("/", async (req, resp) => {

    const { type, surveyId } = req.body

    // return resp.json(req.body)

    try {

        const survey = await SurveyModel.findOne({ _id: surveyId })

        switch (type) {
            case 0: {
                const newQuestion = await QuestionModel.create(req.body)
                survey.questions = [newQuestion._id, ...survey.questions]
                survey.save()

                return resp.json({
                    statue: "success",
                    msg: "سوال ذخیره شد"
                })
            }
            case 1: {
                const newQuestion = await QuestionModel.create(req.body)
                survey.questions = [...survey.questions, newQuestion._id]
                survey.save()
                return resp.json({
                    statue: "success",
                    msg: "سوال ذخیره شد"
                })
            }


            case 2: {
                const newQuestion = await QuestionModel.create(req.body);

                survey.questions = [...survey.questions, newQuestion._id];

                await survey.save();

                const surveyWithQuestions = await SurveyModel.findOne({ _id: surveyId }).populate('questions')

                const startId = surveyWithQuestions.questions.filter(item => item.type == 0).map(item => item._id)[0]
                const endId = surveyWithQuestions.questions.filter(item => item.type == 1).map(item => item._id)[0]

                const questionIds = surveyWithQuestions.questions.filter(item => item.type != 0 && item.type != 1).map(item => item._id)

                await Promise.all(questionIds.map(async (item, index) => {
                    const question = await QuestionModel.findOne({ _id: item });

                    // Update the final_destination of the previous question
                    if (index > 0) {
                        const previousQuestion = await QuestionModel.findOne({ _id: questionIds[index - 1] });
                        previousQuestion.final_destination = question ? question._id : "";
                        await previousQuestion.save();
                    }
                    // If this is the last question, its final_destination should be empty
                    if (index === questionIds.length - 1) {
                        question.final_destination = "";
                        await question.save();

                    }
                }));

                survey.questions = [startId, ...questionIds, endId]

                survey.save()




                // Return the newly created question as a response
                return resp.json(newQuestion);
            }

            case 3: {

                const { choices, ...res } = req.body;

                // Insert the new choices and get their IDs
                const savedChoices = await ChoiceModel.insertMany(choices);
                const choiceIds = savedChoices.map(choice => choice._id);

                // Create the new question with the associated choice IDs
                const newQuestion = await QuestionModel.create({
                    ...res,
                    choices: choiceIds
                });

                survey.questions = [...survey.questions, newQuestion._id];

                await survey.save();

                const surveyWithQuestions = await SurveyModel.findOne({ _id: surveyId }).populate('questions')

                const startId = surveyWithQuestions.questions.filter(item => item.type == 0).map(item => item._id)[0]
                const endId = surveyWithQuestions.questions.filter(item => item.type == 1).map(item => item._id)[0]

                const questionIds = surveyWithQuestions.questions.filter(item => item.type != 0 && item.type != 1).map(item => item._id)


                await Promise.all(questionIds.map(async (item, index) => {
                    const question = await QuestionModel.findOne({ _id: item });
                    // Update the final_destination of the previous question
                    if (index > 0) {
                        const previousQuestion = await QuestionModel.findOne({ _id: questionIds[index - 1] });
                        previousQuestion.final_destination = question ? question._id : "";
                        await previousQuestion.save();
                    }
                    // If this is the last question, its final_destination should be empty
                    if (index === questionIds.length - 1) {
                        question.final_destination = "";
                        await question.save();
                    }
                }));

                survey.questions = [startId, ...questionIds, endId]

                survey.save()
                return resp.json(newQuestion);
            }


            default:
                break;
        }

    } catch (e) {
        console.log(e);

    }





})


module.exports = router