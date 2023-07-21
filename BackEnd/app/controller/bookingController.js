const Booking = require("../models/booking");
const Station = require("../models/station");

const bookingController = {};

bookingController.create = async (req, res) => {
    try {
        const { stationId, customerId, chargingOptionId } = req.query
        const { body } = req
        const booking = await Booking.create({ stationId: stationId, customerId: customerId, chargingOptionId: chargingOptionId }, body)
        if (booking) {
            res.json(booking)
        } else {
            res.json({})
        }
    } catch (err) {
        res.json(err)
    }
}

bookingController.show = async (req, res) => {
    try {
        //showing the specific booking detail
        const { id } = req.params
        const booking = await Booking.findById(id)
        if (booking) {
            res.json(booking)
        } else {
            res.json({})
        }
    } catch (err) {
        res.json(err)
    }
}

bookingController.destroy = async (req, res) => {
    try {
        //deleting the specific booking status
        const { id } = req.params
        const booking = await Booking.findByIdAndDelete(id)
        if (booking) {
            res.json(booking)
        } else {
            res.json({})
        }
    } catch (err) {
        res.json(err)
    }
}

//show bookings on specific station  
bookingController.showAll = async (req, res) => {
    try {
        const stationId = req.query.stationId
        const booking = await Booking.find({ stationId: stationId })
        if (booking) {
            res.json(booking)
        } else {
            res.json({})
        }
    } catch (err) {
        res.json(err)
    }
}

module.exports = bookingController;