const mongoose = require("mongoose")
const schema = mongoose.Schema

const paymentschema = new schema({
    cardnumber:{type:String},
    expire:{type:String},
    cvv:{type:String}
})

const paymentmodel= mongoose.model('payment_data',paymentschema)
module.exports=paymentmodel