const mongoose = require("mongoose")

const Schema = mongoose.Schema
const CompanySchema = Schema({
    name: {
        type: String,
        required: true
    },
    chargingOption: [
        {
            portType: {
                type: String
            }
        }
    ]
})

const Company = mongoose.model('Company', CompanySchema)

module.exports = Company