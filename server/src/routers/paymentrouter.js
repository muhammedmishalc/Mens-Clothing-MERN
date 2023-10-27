const express = require('express')
const checkAuth = require('../middleware/checkAuth')
const paymentmodel = require('../models/paymentmodel')
const paymentrouter = express.Router()


paymentrouter.post('/addcard', async (req, res) => {
    try {
        const { cardnumber, expire, cvv } = req.body
        if (cardnumber && expire && cvv) {

            const final = await paymentmodel({ cardnumber, expire, cvv }).save()
            if (final) {
                return res.status(200).json({
                    success: true,
                    error: false,
                    message: 'Card added'
                })
            }else{
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: 'Card not added'
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
            message: 'Something went wrong'
        })
    }
})

module.exports = paymentrouter