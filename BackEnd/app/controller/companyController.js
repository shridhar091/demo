const Cars = require('../models/cars')
const Company = require('../models/company')
const Station = require('../models/station')


const companyController = {}

companyController.register = async (req, res) => {
    try {
        const { body } = req
        const company = await Company(body)
        const result = await company.save()
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}

companyController.list = async (req, res) => {
    try {
        const company = await Company.find()
        res.json(company)
    } catch (error) {
        res.json(error)
    }
}

companyController.update = async (req, res) => {
    try {
        const { id } = req.params
        const { chargingOptionId } = req.query
        const { body } = req
        const company = await Company.findOne({ _id: id })
        if (company) {
            company.set(body)
            await company.save()
            if (chargingOptionId) {
                // Check if the charging option already exists
                const existingOptionIndex = company.chargingOption.findIndex(ele => ele._id.toString() === chargingOptionId)
                if (existingOptionIndex !== -1) {
                    // Update an existing charging option
                    company.chargingOption[existingOptionIndex] = { ...company.chargingOption[existingOptionIndex], ...body }
                } else {
                    // Add a new charging option
                    const newOption = { _id: chargingOptionId, ...body }
                    company.chargingOption.push(newOption)
                }
                await company.save()
            }
            res.json(company)
        }
        else {
            res.status(404).json({ error: "company not found" });
        }

    } catch (error) {
        res.json(error)
    }
}

//Delete Company
companyController.destroy=async(req,res)=>{
try {
    const {id}=req.params
    const company=Company.findByIdAndDelete(id)
    const car=Cars.deleteMany({companyID:id})
    const promise=await Promise.all([company,car])
    res.json(promise[0])
} catch (error) {
    res.json(error)
}
}


module.exports = companyController