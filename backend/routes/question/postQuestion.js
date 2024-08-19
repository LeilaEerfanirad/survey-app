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


                await Promise.all(survey.questions.map(async (item, index) => {
                    const question = await QuestionModel.findOne({ _id: item });

                    // Update the final_destination of the previous question
                    if (index > 0) {
                        const previousQuestion = await QuestionModel.findOne({ _id: survey.questions[index - 1] });

                        if (previousQuestion) {

                            previousQuestion.final_destination = question ? question._id : "";
                            await previousQuestion.save();
                        }
                    }

                    // If this is the last question, its final_destination should be empty
                    if (index === survey.questions.length - 1) {
                        if (question) {
                            question.final_destination = "";
                            await question.save();
                        }
                    }
                }));

                return resp.json({
                    statue: "success",
                    msg: "سوال ذخیره شد"
                })
            }
            case 1: {
                const newQuestion = await QuestionModel.create(req.body)
                survey.questions = [...survey.questions, newQuestion._id]
                survey.save()

                await Promise.all(survey.questions.map(async (item, index) => {
                    const question = await QuestionModel.findOne({ _id: item });

                    // Update the final_destination of the previous question
                    if (index > 0) {
                        const previousQuestion = await QuestionModel.findOne({ _id: survey.questions[index - 1] });

                        if (previousQuestion) {

                            previousQuestion.final_destination = question ? question._id : "";
                            await previousQuestion.save();
                        }
                    }

                    // If this is the last question, its final_destination should be empty
                    if (index === survey.questions.length - 1) {
                        if (question) {
                            question.final_destination = "";
                            await question.save();
                        }
                    }
                }));



                return resp.json({
                    statue: "success",
                    msg: "سوال ذخیره شد"
                })
            }


            case 2: {
                const surveyWithQuestions = await SurveyModel.findOne({ _id: surveyId }).populate('questions')
                const newQuestion = await QuestionModel.create(req.body);

                const endQuestionIndex = surveyWithQuestions.questions.findIndex(item => item.type === 1)
                const startQuestionIndex = surveyWithQuestions.questions.findIndex(item => item.type === 0)

                if (endQuestionIndex !== -1) {
                    const [endQuestionId] = survey.questions.splice(endQuestionIndex, 1)
                    survey.questions = [startQuestionId, ...survey.questions, newQuestion._id, endQuestionId];

                }

                const [startQuestionId] = survey.questions.splice(startQuestionIndex, 1)

                survey.questions = [startQuestionId, ...survey.questions, newQuestion._id, endQuestionId];

                await survey.save();




                await Promise.all(survey.questions.map(async (item, index) => {
                    const question = await QuestionModel.findOne({ _id: item });

                    // Update the final_destination of the previous question
                    if (index > 0) {
                        const previousQuestion = await QuestionModel.findOne({ _id: survey.questions[index - 1] });

                        if (previousQuestion) {

                            previousQuestion.final_destination = question ? question._id : "";
                            await previousQuestion.save();
                        }
                    }

                    // If this is the last question, its final_destination should be empty
                    if (index === survey.questions.length - 1) {
                        if (question) {
                            question.final_destination = "";
                            await question.save();
                        }
                    }
                }));




                // Return the newly created question as a response
                return resp.json(newQuestion);
            }

            case 3: {
                const surveyWithQuestions = await SurveyModel.findOne({ _id: surveyId }).populate('questions')

                const { choices, ...res } = req.body;

                // Insert the new choices and get their IDs
                const savedChoices = await ChoiceModel.insertMany(choices);
                const choiceIds = savedChoices.map(choice => choice._id);

                // Create the new question with the associated choice IDs
                const newQuestion = await QuestionModel.create({
                    ...res,
                    choices: choiceIds
                });

                const endQuestionIndex = surveyWithQuestions.questions.findIndex(item => item.type === 1)

                const [endQuestionId] = survey.questions.splice(endQuestionIndex, 1)

                survey.questions = [...survey.questions, newQuestion._id, endQuestionId];

                // Save the updated survey
                await survey.save();


                await Promise.all(survey.questions.map(async (item, index) => {
                    const question = await QuestionModel.findOne({ _id: item });

                    // Update the final_destination of the previous question
                    if (index > 0) {
                        const previousQuestion = await QuestionModel.findOne({ _id: survey.questions[index - 1] });

                        if (previousQuestion) {
                            previousQuestion.final_destination = question ? question._id : "";
                            await previousQuestion.save();

                        }

                    }

                    // If this is the last question, its final_destination should be empty
                    if (index === survey.questions.length - 1) {
                        if (question) {
                            question.final_destination = "";
                            await question.save();
                        }
                    }
                }));

                // Return the newly created question as a response
                return resp.json(newQuestion);
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