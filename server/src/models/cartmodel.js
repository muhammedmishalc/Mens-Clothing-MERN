const mongoose = require("mongoose")
const schema = mongoose.Schema

const cartschema = new schema({
    productid:{type:schema.Types.ObjectId,ref:'product-data'},
    userid:{type:schema.Types.ObjectId,ref:'user_data'},
    quantity:{type:String},
    status:{type:String}
})

const cartmodel= mongoose.model('cart-table',cartschema)
module.exports=cartmodel