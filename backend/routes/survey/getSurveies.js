const express = require('express')
const router = express.Router()
const SurveyModel = require('../../models/Survey')
const UserModel = require('../../models/User')
const { getDataJwt } = require('../../functions/jwtHandler')



router.get("/", async (req, resp) => {

    const token = req.headers.authorization

    try {

        const { userId } = await getDataJwt(token)

        const user = await UserModel.findOne({ _id: userId }).populate('surveies')

        console.log(user);


        return resp.json({
            surveies: user.surveies
        })


    } catch (e) {
        console.log(e);
    }
})



module.exports = router