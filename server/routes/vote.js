const express = require('express')
const {updateVote,vote} = require('../controller/vote')


const router = express.Router()
router.get('/vote',vote)
router.put('/vote',updateVote)

module.exports = router;