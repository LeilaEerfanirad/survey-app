const express = require('express')

const router = express.Router()

const postEdge = require('./postEdge')
router.use('/', postEdge)



module.exports = router