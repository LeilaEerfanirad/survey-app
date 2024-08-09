const express = require('express');
const QuestionModel = require('../../models/Question');
const SurveyModel = require('../../models/Survey');
const router = express.Router();

router.delete('/:questionId', async (req, resp) => {
    const { questionId } = req.params;
    const { surveyId } = req.body;

    try {
        // Step 1: Delete the question from the database
        const deletedQuestion = await QuestionModel.findByIdAndDelete(questionId);

        // if (!deletedQuestion) {
        //     return resp.status(404).json({ message: 'Question not found' });
        // }

        // Step 2: Remove the question's _id from the survey's questions array
        const survey = await SurveyModel.findByIdAndUpdate(
            surveyId,
            { $pull: { questions: questionId } },  // $pull removes the questionId from the questions array
            { new: true } // Return the updated survey document
        );

        // if (!survey) {
        //     return resp.status(404).json({ message: 'Survey not found' });
        // }

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
