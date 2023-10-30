const express = require('express')
const updateUser = require('../controller/updateUser')


const router = express.Router()
router.put('/user',updateUser)

module.exports = router;