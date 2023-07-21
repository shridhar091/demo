const mongoose=require("mongoose")
const Schema=mongoose.Schema
const ProfileSchema= new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    carId:{
        type:Schema.Types.ObjectId,
        ref:"Cars"
    }
})

const Profile=mongoose.model('Profile',ProfileSchema)

module.exports=Profile