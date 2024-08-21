const express = require('express');
const router = express.Router();
const SurveyModel = require('../../models/Survey');
const QuestionModel = require('../../models/Question');

router.post("/:surveyId/change-orders", async (req, resp) => {
    const { surveyId } = req.params;
    const { prior_questionId, questionId } = req.body;

    try {
        const survey = await SurveyModel.findOne({ _id: surveyId }).populate('questions');

        const startId = survey.questions.filter(item => item.type == 0).map(item => item._id)[0]
        const endId = survey.questions.filter(item => item.type == 1).map(item => item._id)[0]

        const from = survey.questions.findIndex(item => item._id.toString() === questionId);
        const to = survey.questions.findIndex(item => item._id.toString() === prior_questionId);

        // Remove the question from the original position
        const [element] = survey.questions.splice(from, 1);

        // Insert the question into the new position
        survey.questions.splice(to, 0, element);

        // Save the survey with the new order
        await survey.save();

        const questionIds = survey.questions.filter(item => item.type != 0 && item.type != 1).map(item => item._id)


        // Update the final_destination fields for the reordered questions
        await Promise.all(questionIds.map(async (item, index) => {
            const question = await QuestionModel.findOne({ _id: item._id });

            if (index < questionIds.length - 1) {
                question.final_destination = questionIds[index + 1]._id;
            } else {
                question.final_destination = ""; // Last question has no final_destination
            }

            await question.save();
        }));

        survey.questions = [startId, ...questionIds, endId]

        survey.save()

        return resp.json(survey.questions);

    } catch (e) {
        console.log(e);
        return resp.status(500).json({ error: 'An error occurred while changing the order of questions.' });
    }
});

module.exports = router;
