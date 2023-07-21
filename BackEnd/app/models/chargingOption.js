const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ChargingOptionSchema = new Schema({
    stationId: {
        type: Schema.Types.ObjectId,
        ref:"Station",
        required: true
    },
    name: {
        type: String
    },
    price: {
        type: String
    }

})
const ChargingOptions = mongoose.model('ChargingOptions', ChargingOptionSchema)

module.exports = ChargingOptions