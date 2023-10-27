const mongoose=require('mongoose')
const schema=mongoose.Schema

const registerschema= new schema({
    username:{type:String},
    emailid:{type:String},
    phone:{type:String},
    street:{type:String},
    city:{type:String},
    pincode:{type:String},
    password:{type:String},
    role:{type:String}
})
const registermodel=mongoose.model('user_data',registerschema)
module.exports=registermodel