const mongoose = require('mongoose')
const User = require('./user')
const Station = require('./station')
const ChargingOptions = require('./chargingOption')
const Schema = mongoose.Schema
const BookingSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    stationId: {
        type: Schema.Types.ObjectId,
        ref: "Station"
    },
    chargingOptionId: {
        type: Schema.Types.ObjectId,
        ref: "ChargingOptions"
    },
    amount: {
        type: Number
    },
    bookedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    startDateTime: {
        type: String
    },
    endDateTime: {
        type: String
    }
})
const Booking=mongoose.model('Booking',BookingSchema)
module.exports=Booking