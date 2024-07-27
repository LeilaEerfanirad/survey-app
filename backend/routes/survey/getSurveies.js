const express = require('express')
const router = express.Router()
const SurveyModel = require('../../models/Survey')



router.get("/", async (req, resp) => {

    try {

        const surveies = await SurveyModel.find({})

        return resp.json({
            surveies
        })


    } catch (e) {
        console.log(e);
    }
})



module.exports = router