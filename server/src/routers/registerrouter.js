const express = require('express')
const registermodel = require('../models/registermodel')
registerrouter = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const checkAuth = require('../middleware/checkAuth')

registerrouter.post('/adduser', async (req, res) => {
    try {
        console.log(req.body);
        const { username, emailid, phone, street, city, pincode, password } = req.body
        if (username && emailid && phone && street && city && pincode && password) {


            const olduser = await registermodel.findOne({ username: username })
            if (olduser) {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: 'username already exists',
                    olduser: olduser
                })
            }
            const oldemail = await registermodel.findOne({ emailid: emailid })
            if (oldemail) {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: 'emailid already exists',
                    olduser: oldemail
                })
            }
            const oldphone = await registermodel.findOne({ phone: phone })
            if (oldphone) {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: 'phone number already exists',
                    olduser: oldphone
                })
            }
            const hashedpassword = await bcrypt.hash(req.body.password, 8)
            console.log(hashedpassword);
            const final = await registermodel({ username, emailid, phone, street, city, pincode, password: hashedpassword, role: 'user' }).save()
            console.log(final);
            if (final) {
                return res.status(200).json({
                    success: true,
                    error: false,
                    details: final,
                    message: 'user registered'
                })
            }
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'All fields are not filled'
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            details: error,
            message: 'something went wrong'
        })
    }
})

registerrouter.get('/viewusers', async (req, res) => {
    try {
        const data = await registermodel.find()
        if (data) {
            return res.status(200).json({
                success: true,
                error: false,
                details: data,
                message: 'viewing all users'
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'no data found'
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            data: error,
            message: "something went wrong"
        })
    }
})

registerrouter.post('/log', async (req, res) => {
    try {
        const { username, password } = req.body
        if (username && password) {
            const data = await registermodel.findOne({ username: username })
            console.log(data);
            if (data) {

                const checkpassword = await bcrypt.compare(password, data.password)
                console.log(checkpassword);
                if (checkpassword == true) {
                    const token = jwt.sign({ userId: data._id, userName: data.username, role: data.role },
                        'secretid',
                        { expiresIn: '5h' })
                    return res.status(200).json({
                        token: token,
                        role: data.role,
                        userid: data._id,
                        username: data.username,
                        message: 'Login successfull'
                    })
                } else {
                    return res.status(400).json({
                        success: false,
                        error: true,
                        message: 'incorrect password'
                    })
                }
            } else {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: 'username not found'
                })
            }
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'all fields are not filled'
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            details: error,
            message: 'something went wrong'
        })
    }
})

registerrouter.get('/deleteall', async (req, res) => {
    try {
        const data = await registermodel.deleteMany()
    } catch (error) {
        console.log(error);
    }
})

registerrouter.get('/viewoneprofile', checkAuth, async (req, res) => {
    try {
        const id = req.userdata.userid;

        const data = await registermodel.findOne({ _id: id })
        if (data) {
            return res.status(200).json({
                success: true,
                error: false,
                details: data,
                message: 'viewing one user'
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'user not found'
            })
        }


    } catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            details: error,
            message: 'something went wrong'
        })

    }
})
registerrouter.post('/editprofile/:_id', async (req, res) => {
    try {
        const id = req.params._id
        const { username, emailid, phone, address } = req.body
        const data = await registermodel.updateOne({ _id: id }, { $set: { username, emailid, phone, address } })
        console.log(data);
        if (data.modifiedCount == 1) {
            return res.status(200).json({
                success: true,
                error: false,
                message: 'Profile edited'

            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'not edited'
            })
        }
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'something went wrong'
        })
    }
})


module.exports = registerrouter