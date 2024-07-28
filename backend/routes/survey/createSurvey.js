const express = require('express')
const router = express.Router()
const SurveyModel = require('../../models/Survey')
const UserModel = require('../../models/User')
const { getDataJwt } = require('../../functions/jwtHandler')



router.post("/", async (req, resp) => {

    const { name } = req.body
    const token = req.headers.authorization

    try {
        const { userId } = await getDataJwt(token)

        const user = await UserModel.findById({ _id: userId })

        const newSurvey = await SurveyModel.create({
            name
        })

        user.surveies = [...user.surveies, newSurvey._id]
        user.save()

        resp.json({
            surveyId: newSurvey._id,
            status: "success",
            msg: "نظرستجی ساختع شد"
        })



    } catch (e) {

        return resp.json({
            status: "error",
            msg: "عدد تصویر اشتباه وارد شده است"
        })

    }

})


module.exports = router