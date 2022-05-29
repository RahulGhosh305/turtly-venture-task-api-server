const express = require('express')
const router = express.Router()
const userRegistrationController = require('../controller/registrationController')
// const authentication = require('../middleware/authenticate')

// Registration User
router.post('/register', userRegistrationController.userRegistration)

// Login User 
router.post('/login', userRegistrationController.userLogin)

// All Users
router.get('/users', userRegistrationController.getAllUsers)

module.exports = router