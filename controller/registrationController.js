const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRegistrationModel = require('../models/UserRegistrationModel')
const saltRounds = 10;

// Registration Controller
const userRegistration = (req, res, next) => {
    const password = req.body.password
    const email = req.body.email
    // console.log("Server Register Enter")
    bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
            res.json({
                error: err
            })
        }

        const userRegsiterData = new userRegistrationModel({
            email: req.body.email,
            password: hash
        })

        userRegsiterData.save()
            .then(result => {
                // // ---------------------------
                // let token = jwt.sign({ email: email }, `${process.env.PRIVATE_JWT_KEY}`, { expiresIn: '2h' });
                // res.send({
                //     message: "User Created Succesfully",
                //     token
                // })
                // // ----------------------------
                res.status(201).json("User Created Succesfully")
            })
            .catch(error => {
                res.json("User Not Save")
            })

    });
}
// Login Controller
const userLogin = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    // console.log(process.env.PRIVATE_JWT_KEY);
    // console.log("Server Login Enter")
    userRegistrationModel.findOne({ email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.json({
                            message: "Error In Occoured"
                        })
                    }
                    else if (result) {
                        //Login Succesfully
                        let token = jwt.sign({ email: user.email, id: user._id }, `${process.env.PRIVATE_JWT_KEY}`, { expiresIn: '2h' });
                        res.send({
                            // message: "login",
                            token
                        })
                        // res.send("Login Succesfully")
                    }
                    else {
                        res.json({
                            message: "Login Failed / Password Not match"
                        })
                    }
                });
            }
            else {
                res.json({
                    message: "User Not Found / Email Not Found"
                })
            }
        })
}

// All User Controller
const getAllUsers = (req, res, next) => {
    userRegistrationModel.find()
        .then(users => {
            res.json(users)
        })
        .catch(error => {
            res.json(error)
        })
}

module.exports = {
    userRegistration,
    userLogin,
    getAllUsers
}