const express = require('express');
const router = express.Router();
const SurveyModel = require('../../models/Survey');
const QuestionModel = require('../../models/Question');

router.post("/:surveyId/change-orders", async (req, resp) => {
    const { surveyId } = req.params;
    const { prior_questionId, questionId } = req.body;

    try {
        const survey = await SurveyModel.findOne({ _id: surveyId }).populate('questions');

        const from = survey.questions.findIndex(item => item._id.toString() === questionId);
        const to = survey.questions.findIndex(item => item._id.toString() === prior_questionId);

        // Remove the question from the original position
        const [element] = survey.questions.splice(from, 1);

        // Insert the question into the new position
        survey.questions.splice(to, 0, element);

        // Save the survey with the new order
        await survey.save();

        // Update the final_destination fields for the reordered questions
        await Promise.all(survey.questions.map(async (item, index) => {
            const question = await QuestionModel.findOne({ _id: item._id });

            if (index < survey.questions.length - 1) {
                question.final_destination = survey.questions[index + 1]._id;
            } else {
                question.final_destination = ""; // Last question has no final_destination
            }

            await question.save();
        }));

        return resp.json(survey.questions);

    } catch (e) {
        console.log(e);
        return resp.status(500).json({ error: 'An error occurred while changing the order of questions.' });
    }
});

module.exports = router;
