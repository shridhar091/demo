const mongoose=require("mongoose")
const Company=require('./company')
const Schema=mongoose.Schema
const CarsSchema=Schema({
    name:{
        type:String,
        required:true
    },
    companyId:{
        type:Schema.Types.ObjectId,
        ref:"Company"
    }
})

const Cars=mongoose.model('Cars',CarsSchema)

module.exports=Cars