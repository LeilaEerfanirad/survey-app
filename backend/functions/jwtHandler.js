const jwt = require('jsonwebtoken')
const AUTH_JWT_OPTIONS = { expiresIn: '100h' }
const AUTH_JWT_SECRET = 'TOP-SECRET'


function getJwtToken(data, callback) {

    jwt.sign(data, AUTH_JWT_SECRET, AUTH_JWT_OPTIONS, (err, token) => {
        if (err) {
            callback("error", err)
        } else {
            callback("success", token)
        }
    })
}


function getDataJwt(token, callback) {

    jwt.verify(token, AUTH_JWT_SECRET, (err, decoded) => {
        if (err) {
            callback("error", err)

        } else {
            callback("success", decoded)
        }
    });

}


module.exports = { getJwtToken, getDataJwt }