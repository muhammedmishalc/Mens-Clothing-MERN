const mongoose = require("mongoose");
const express = require('express')
const app = express()
const parser = require('body-parser');
const mainrouter = require("./src/routers/mainrouter");
const registerrouter=require("./src/routers/registerrouter");
const cartrouter = require("./src/routers/cartrouter");
const paymentrouter = require("./src/routers/paymentrouter");

app.use(parser())
app.use(express.urlencoded({extented:true}))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use('/main',mainrouter)
app.use('/reg',registerrouter)
app.use('/cart',cartrouter)
app.use('/pay',paymentrouter)


const url = 'mongodb+srv://mishalc5678:mishalc5678@cluster0.tgwxmvg.mongodb.net/Clothing?retryWrites=true&w=majority'

mongoose.connect(url).then(() => {
    app.listen(2500, () => {
        console.log('Server started')
    })

}).catch((error) => {
    console.log(error);
}
)