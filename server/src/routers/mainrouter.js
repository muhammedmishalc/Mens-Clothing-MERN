const express = require('express');
const mainmodel = require('../models/mainmodel');
const checkAuth = require('../middleware/checkAuth');
const mainrouter = express.Router()
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../clothing/public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, req.body.filename)
    }
  })
  
  const upload = multer({ storage: storage })


mainrouter.post('/addproduct', upload.single('file'),async (req, res) => {
    try {
        console.log(req.body);
        const productname = req.body.productname.toLowerCase()
        const { category, price, quantityavailable, filename, description } = req.body
        if (productname && category && price && quantityavailable && filename && description) {


            const oldproduct = await mainmodel.findOne({ productname: productname })
            if (oldproduct) {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: 'product name already exists',
                    oldproduct: oldproduct
                })
            }

            const final = await mainmodel({ productname, category, price, quantityavailable, image:filename, description }).save()
            if (final) {
                return res.status(200).json({
                    success: true,
                    error: false,
                    details: productname,
                    message: 'Product added'
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

mainrouter.get('/viewproducts', async (req, res) => {
    try {
        const data = await mainmodel.find()
        if (data) {
            return res.status(200).json({
                success: true,
                error: false,
                details: data,
                message: 'viewing all Products'
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'no products found'
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

mainrouter.post('/editproduct/:_id', async (req, res) => {
    try {
        const id = req.params._id
        const { productname, category, price, quantityavailable } = req.body
        const data = await mainmodel.updateOne({ _id: id }, { $set: { productname, category, price, quantityavailable } })
        console.log(data);
        if (data.modifiedCount == 1) {
            return res.status(200).json({
                success: true,
                error: false,
                message: 'edited'

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

mainrouter.get('/deleteproduct/:_id', async (req, res) => {
    try {
        const id = req.params._id;

        const details = await mainmodel.findOne({ _id: id })
        const data = await mainmodel.deleteOne({ _id: id })
        if (data.deletedCount == 1) {
            return res.status(200).json({
                success: true,
                error: false,
                message: `${details.productname} product deleted`,
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'product not deleted'
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'something went wrong'
        })

    }
})

mainrouter.get('/viewoneproduct/:_id', async (req, res) => {
    try {
        const id = req.params._id;

        const data = await mainmodel.findOne({ _id: id })
        if (data) {
            return res.status(200).json({
                success: true,
                error: false,
                details: data,
                message: 'viewing one product'
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'product not found'
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
mainrouter.get('/searchproduct/:name', async (req, res) => {
    try {
        const name = req.params.name;

        const data = await mainmodel.findOne({ productname: name })
        if (data) {
            return res.status(200).json({
                success: true,
                error: false,
                details: data,
                message: 'viewing searched product'
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'product not found'
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


module.exports = mainrouter