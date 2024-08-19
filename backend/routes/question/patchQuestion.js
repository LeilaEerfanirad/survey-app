const express = require('express')
const router = express.Router()
const QuestionModel = require('../../models/Question')
const ChoiceModel = require('../../models/Choice')



router.patch("/:questionId", async (req, resp) => {


    const { questionId } = req.params

    const { type } = req.body

    try {
        const question = await QuestionModel.findOne({ _id: questionId })

        switch (type) {
            //short answer
            case 0: {

                const { title, enter_text } = req.body

                question.title = title
                question.enter_text = enter_text

                question.save()

                return resp.json(question)

            }
            case 1: {

                const { title } = req.body

                question.title = title

                question.save()

                return resp.json(question)

            }

            case 2: {
                const { title } = req.body

                question.title = title

                question.save()

                return resp.json(question)

            }

            case 3: {
                const { choices, title } = req.body

                question.title = title

                // Create a Set of current choice IDs
                const currentChoiceIds = new Set(question.choices.map(choice => choice._id.toString()));

                for (const choiceData of choices) {
                    let choice;

                    if (choiceData._id) {
                        // Check if the choice exists
                        choice = await ChoiceModel.findById(choiceData._id);
                    }

                    if (!choice) {
                        // If choice doesn't exist, create it
                        choice = new ChoiceModel({ name: choiceData.name });
                        await choice.save();
                    } else {
                        // If the choice exists, update its name
                        choice.name = choiceData.name;
                        await choice.save();
                    }

                    // Add the new/updated choice's ID to the Set (keeping track of valid choices)
                    currentChoiceIds.delete(choice._id.toString());

                    // Ensure the choice is in the question's choices array
                    if (!question.choices.some(q => q._id.toString() === choice._id.toString())) {
                        question.choices.push(choice._id);
                    }
                }

                // Remove any choices from the question's choices array that are no longer valid
                question.choices = question.choices.filter(choice => !currentChoiceIds.has(choice._id.toString()));

                // Save the updated question
                await question.save();


                return resp.json(question)

            }

                break;

            default:
                break;
        }

    } catch (e) {
        console.log(e);

    }



    return resp.json(req.params)



})



module.exports = router
