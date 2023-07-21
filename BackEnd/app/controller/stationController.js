const ChargingOptions = require('../models/chargingOption')
const Station = require('../models/station')

const stationController = {}

stationController.create = async (req, res) => {
    try {
        const body = req.body
        const station = await Station.create(body)
        if (station) {
            res.json(station)
        } else {
            res.json({})
        }
    }
    catch (err) {
        res.json(err)
    }
}

stationController.show = async (req, res) => {
    try {
        const id = req.params.id
        const station = await Station.findById(id)
        if (station) {
            res.json(station)
        } else {
            res.json({})
        }
    } catch (err) {
        res.json(err)
    }
}
//list all the station
stationController.list = async (req, res) => {
    try {
        const station = await Station.find()
        if (station) {
            res.json(station)
        } else {
            res.json({})
        }
    } catch (err) {
        res.json(err)
    }
}
//update the 
stationController.update = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const { chargingOptionId } = req.query;
        console.log(typeof chargingOptionId);
        const station = await Station.findById(id);
        if (station) {
            // Update the station details
            station.set(body);
            // Check if the "geo" property exists in the request body
            if (body.geo) {
                // Update the "geo" object within the station details
                station.geo = { ...station.geo, ...body.geo };
            }
            await station.save();

            if (chargingOptionId) {
                // Check if the charging option already exists
                // const existingOptionIndex = station.chargingOptions.findIndex(option => option._id.valueOf() === chargingOptionId)
                // if (existingOptionIndex !== -1) {
                //     // Update an existing charging option
                //     station.chargingOptions[existingOptionIndex] = { ...station.chargingOptions[existingOptionIndex], ...body };
                // } else {
                //     // Add a new charging option
                //     const newOption = { _id: chargingOptionId, ...body };
                //     station.chargingOptions.push(newOption);
                // }

                const resultId = station.chargingOptions.map((ele => ele._id !== chargingOptionId))
                if (resultId !== -1) {
                    // Update an existing charging option
                    station.chargingOptions[resultId] = { ...station.chargingOptions[resultId], ...body }
                } else {
                    //add a new charging option
                    const newOption = { _id: chargingOptionId, ...body }
                    station.chargingOptions.push(newOption)
                }
                await station.save();
            }
            res.json(station);
        } else {
            res.status(404).json({ error: "Station not found" });
        }
    }
    catch (err) {
        res.status(500).json({ error: "An error occurred", error: err });
    }
};


// //station delete
// stationController.destroy = async (req, res) => {
//     try {
//         const id = req.params.id

//         const station =Station.findByIdAndDelete(id)
//         const chargingOption=ChargingOptions.deleteMany({stationId:id})
//         const result=Promise.all([station,chargingOption])
//         if (result) {
//             res.json(result[0])
//         } else {
//             res.json({})
//         }

//     } catch (err) {
//         res.json(err)
//     }
// }

//delete station and that related charging options also delete
stationController.deletemany = async (req, res) => {
    try {
        const { id } = req.params
        const station = Station.findByIdAndDelete(id)
        const chargingOption = ChargingOptions.deleteMany({ stationId: id })
        const promise = await Promise.all([station, chargingOption])
        if (promise) {
            res.json(promise[0])
        } else {
            res.json({})
        }
    } catch (err) {
        res.json(err)
    }
}

//find station on staff name
stationController.findOnStaffName = async (req, res) => {
    try {
        const { staff } = req.query
        const result = await Station.find({ staff: { $regex: staff, $options: 'i' } });
        if (result) {
            res.json(result)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}


module.exports = stationController