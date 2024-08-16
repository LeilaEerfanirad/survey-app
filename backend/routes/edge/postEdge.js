const express = require('express')
const router = express.Router()
const QuestionModel = require('../../models/Question')
const EdgeModel = require('../../models/Edge')
const ConditionModel = require('../../models/Condition')


router.post('/', async (req, resp) => {

    //questionId
    const { _id, edges } = req.body

    try {
        const question = await QuestionModel.findOne({ _id }).populate({
            path: 'edges',
            populate: {
                path: 'conditions'
            }
        })


        const edgeIds = await Promise.all(
            edges.map(async (edge) => {
                const conditionsToDelete = edge.conditions.map(item => item._id)
                await ConditionModel.deleteMany({ _id: { $in: conditionsToDelete } });
                await EdgeModel.deleteMany({ _id: { $in: [edge._id] } });
                const savedConditions = await ConditionModel.insertMany(edge.conditions);
                const conditionsIds = savedConditions.map(condition => condition._id);

                const newEdge = await EdgeModel.create({
                    destination: edge.destination,
                    conditions: [...conditionsIds]
                })

                return newEdge._id
            })
        )
        question.edges = edgeIds
        await question.save()
        return resp.json(req.body)

    } catch (e) {
        console.log(e);
    }
})




module.exports = router