const express = require('express');
const QuestionModel = require('../../models/Question');
const SurveyModel = require('../../models/Survey');
const router = express.Router();

router.delete('/:questionId', async (req, resp) => {
    const { questionId } = req.params;
    const { surveyId } = req.body;

    try {
        const survey = await SurveyModel.findOne({ _id: surveyId })

        const deletedQuestion = await QuestionModel.findByIdAndDelete(questionId);

        const newQuestionIds = survey.questions.filter(item => item.toString() !== questionId)

        survey.questions = newQuestionIds

        survey.save()


        const surveyWithQuestions = await SurveyModel.findOne({ _id: surveyId }).populate('questions')

        const startId = surveyWithQuestions.questions.filter(item => item.type == 0).map(item => item._id)[0]
        const endId = surveyWithQuestions.questions.filter(item => item.type == 1).map(item => item._id)[0]

        const questionIds = surveyWithQuestions.questions.filter(item => item.type != 0 && item.type != 1).map(item => item._id)

        await Promise.all(questionIds.map(async (item, index) => {
            const question = await QuestionModel.findOne({ _id: item });

            // Update the final_destination of the previous question
            if (index > 0) {
                const previousQuestion = await QuestionModel.findOne({ _id: questionIds[index - 1] });
                previousQuestion.final_destination = question._id;
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

        return resp.status(200).json({
            message: 'Question deleted successfully and removed from survey',
            survey
        });
    } catch (e) {
        console.error('Error deleting question:', e);
        return resp.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
