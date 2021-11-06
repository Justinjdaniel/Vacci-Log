const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../model/userData');
const store = require('store2');


/* POST user Registration data  */
userRouter.post('/register', (req, res) => {
    const userData = req.body;
    const user = new User(userData);
    console.log(user);
    user.save((err, regUser) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).redirect('/signIn');
            // res.status(200).send(regUser);
        }
    });
});

/* POST user Login data  */
userRouter.post('/login', (req, res) => {
    const userData = req.body;
    User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (!user) {
                // res.status(401).send('Invalid Email');
                const errorStat={status:'Email entered is not registered in our Database',stack: 'Please try again with registered email id, Signup if you dont have an account.'}
                res.status(401).render('error', {message: 'Invalid Email', error: errorStat} );
            } else {
                if (user.password !== userData.password) {
                    // res.status(401).send('Invalid Password');
                    const errorStat = { status: 'Password entered is incorrect', stack: 'Please try again with correct password, Select forgot password to reset password.' }
                    res.status(401).render('error', { message: 'Invalid Password', error: errorStat });
                } else {
                    store('user',user);
                    // const payload = { subject: user._id };
                    // const token = jwt.sign(payload, 'secretKey');
                    // localStorage.setItem('token',token);
                    res.status(200).redirect('/home');
                    // res.status(200).send({ token });
                }
            }
        }
    })
});

module.exports = userRouter;