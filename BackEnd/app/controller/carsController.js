const Cars = require('../models/cars')

const carsController = {}

carsController.create = async (req, res) => {
    try {
        const { body } = req
        body.companyId = req.query.companyId
        const car = new Cars(body)
        const result = await car.save()
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}
//list all the cars
carsController.list = async (req, res) => {
    try {
        const { companyId } = req.params
        const cars = await Cars.find({ companyId: companyId })
        if (cars) {
            res.json(cars)
        } else {
            res.json({ error: "car not found" })
        }
    } catch (error) {
        res.json(error)
    }
}

//delete car details
carsController.destroy = async (req, res) => {
    try {
        const { id } = req.params
        const car = await Cars.findByIdAndDelete(id)
        if (car) {
            res.json(car)
        } else {
            res.json({ error: "car not found" })
        }
    } catch (error) {
        res.json(error)
    }
}

//update Cars Details
carsController.update = async (req, res) => {
    try {
        const { id } = req.params
        const { body } = req
        const car = await Cars.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        if (car) {
            res.json(car)
        } else {
            res.json({ error: "car not found" })
        }
    } catch (error) {
        res.json(error)
    }
}
module.exports = carsController