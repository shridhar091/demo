const Profile = require('../models/profileU')

const profileController = {}

//profile creating
profileController.create = async (req, res) => {
    try {
        const { body } = req
        body.userId = req.query.userId
        body.carId = req.query.carId
        const profile = new Profile(body)
        const result = await profile.save()
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}

//profiles List
profileController.list=async(req,res)=>{
    try {
      const {id}=req.params
      const profile= await Profile.find({_id:id})
      res.json(profile)  
    } catch (error) {
        res.json(error)
    }
}
//profile delete
profileController.destroy=async(req,res)=>{
    try {
      const {id}=req.params
      const profile= await Profile.findByIdAndDelete(id)
      res.json(profile)  
    } catch (error) {
        res.json(error)
    }
}
module.exports = profileController