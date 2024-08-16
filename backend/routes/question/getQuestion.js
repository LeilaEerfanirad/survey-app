const express = require('express')
const QuestionModel = require('../../models/Question')
const router = express.Router()



router.get("/:questionId", async (req, resp) => {

    const { questionId } = req.params

    try {

        const question = await QuestionModel.findOne({ _id: questionId }).populate('choices').populate({
            path: 'edges',
            populate: {
                path: 'conditions'
            }
        });

        return resp.json(question)

    } catch (e) {
        console.log(e);

    }



})

module.exports = router