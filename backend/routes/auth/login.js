const express = require('express')
const router = express.Router()
const UserModel = require('../../models/User')
const { getJwtToken } = require('../../functions/jwtHandler')

router.post('/', async (req, resp) => {
    const { username, password } = req.body

    const user = await UserModel.findOne({ username })

    if (user) {

        if (user.password === password) {

            getJwtToken({ userId: user._id }, (status, result) => {
                if (status === "success") {

                    return resp.json({
                        status: "success",
                        msg: "ورود موفق",
                        token: result,
                    })

                } else {

                    return resp.json({
                        status: "error",
                        msg: "مشکلی پیش آمده است!"
                    })

                }
            })
        } else {

            resp.json({
                status: "error",
                msg: "نام کاربری یا پسوورد اشتباه است!"
            })

        }



    } else {
        resp.json({
            status: "error",
            msg: "نام کاربری یافت نشد!"
        })
    }



})

module.exports = router




