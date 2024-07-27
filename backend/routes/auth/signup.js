const express = require('express')
const router = express.Router()
const UserModel = require('../../models/User')
const { getJwtToken } = require('../../functions/jwtHandler')
// const { getDataJwt, getTokenJwt } = require('../../functions/getJwtWithData')


router.post('/', async (req, resp) => {
    const { username, password } = req.body
    // const captchaToken = req.headers.captchatoken


    const user = await UserModel.findOne({ username })

    if (user) {
        resp.json({
            status: "error",
            msg: "نام کاربری قبلا ثبت نام شده است!"
        })
    } else {

        const newUser = UserModel.create({
            username, password
        })

        getJwtToken({ userId: newUser._id }, (status, result) => {
            if (status === "success") {

                return resp.json({
                    status: "success",
                    msg: "شما ثبت نام شدید!",
                    token: result,
                })

            } else {

                console.log(result);
                return resp.json({
                    status: "error",
                    msg: "مشکلی پیش آمده است!"
                })

            }
        })

    }

})


module.exports = router
