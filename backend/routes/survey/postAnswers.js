const express = require('express');
const router = express.Router();
const QuestionModel = require('../../models/Question');
const SurveyModel = require('../../models/Survey');

router.post('/:surveyId', async (req, resp) => {
    const { surveyId } = req.params;
    const { answers } = req.body;

    try {
        // Iterate over the answers object
        for (const [questionId, answerArray] of Object.entries(answers)) {
            // Find the question by its ID
            const question = await QuestionModel.findById(questionId);

            if (!question) {
                return resp.status(404).json({ error: `Question with ID ${questionId} not found` });
            }

            // Update the answers array in the question
            question.answers.push(...answerArray);

            // Save the updated question
            await question.save();
        }

        return resp.status(200).json({ message: 'Answers saved successfully' });
    } catch (error) {
        console.error('Error saving answers:', error);
        return resp.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
