const express = require('express')
const {loginUser,findUser} = require('../controller/login')


const router = express.Router()
router.post('/login',loginUser)
router.get('/login/:id',findUser)
module.exports = router;