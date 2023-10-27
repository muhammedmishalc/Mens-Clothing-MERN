const mongoose = require('mongoose')
const schema = mongoose.Schema

 const mainschema= new schema({
    productname:{type:String},
    category:{type:String},
    price:{type:String},
    quantityavailable:{type:String},
    image:{type:String},
    description:{type:String}
    
 })
 const mainmodel = mongoose.model('product-data',mainschema)
 module.exports=mainmodel