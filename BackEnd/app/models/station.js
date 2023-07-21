const mongoose = require('mongoose')

const Schema = mongoose.Schema
const StationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    landmark: {
        type: String
    },
    geo: {
        latitude: Number,
        longitude: Number,
        
    },
    chargingOptions: [
        {
            portType: {
                type: String
            }
            // ,
            // unit: {
            //     type: Number
            // }
        }
    ],
    staff: {
        type: String,
        required: true,
        unique:true
    }

})

const Station = mongoose.model('Station', StationSchema)

module.exports = Station