const ChargingOptions = require('../models/chargingOption')

const chargingOptionController = {}

chargingOptionController.create = async (req, res) => {
    try {
        const { body } = req
        body.stationId = req.query.type
        const chargingOption = new ChargingOptions(body)
        const result = await chargingOption.save()
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}
//list all the chargingOptions
chargingOptionController.list = async (req, res) => {
    try {
        const result = await ChargingOptions.find()
        if (result) {
            res.json(result)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}
//show  all the chargingOptions of perticular station
chargingOptionController.show = async (req, res) => {
    try {
        const { stationId } = req.params
        const result = await ChargingOptions.find({ stationId: stationId })
        if (result) {
            res.json(result)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}
//update the chargingOption Details
chargingOptionController.update = async (req, res) => {
    try {
        const { id } = req.params
        const { body } = req
        const result = await ChargingOptions.findByIdAndUpdate({_id:id}, body, { new: true, runvalidator: true })
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}
//delete the charging option delete
chargingOptionController.destroy = async (req, res) => {
    try {
        const { id } = req.params
        const result = await ChargingOptions.findByIdAndDelete(id)
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}


module.exports = chargingOptionController