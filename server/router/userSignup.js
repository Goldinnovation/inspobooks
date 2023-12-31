const express = require('express')
const router = express.Router()
const handleSignup = require('../controller/handleSignup')
const   isUserAuth  = require('../Middlware/isAuth')



router.get('/', isUserAuth)
router.post('/', handleSignup.createUserAccount)


module.exports = router