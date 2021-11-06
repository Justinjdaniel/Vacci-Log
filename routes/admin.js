const express = require('express');
const adminRouter = express.Router();
// const jwt = require('jsonwebtoken');
const Admin = require('../model/adminData');

adminRouter.post('/login', (req, res) => {
    let adminData = req.body;
    Admin.findOne({ email: adminData.email }, (err, admin) => {
        if (err) {
            console.log(err)
        } else {
            if (!admin) {
                res.status(401).send('Invalid Email')
            } else {
                if (admin.password !== adminData.password) {
                    res.status(401).send('Invalid Password')
                } else {
                    // let payload = {subject: user._id}
                    let token = 'adminPower';
                    res.status(200).send({ token })
                }
            }
        }
    })
});


module.exports = adminRouter;