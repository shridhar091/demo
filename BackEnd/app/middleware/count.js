const User=require('../models/user')
const count=async(req,res,next)=>{
try {
const count=await User.countDocuments({})
if (count===0) {
    req.body.role='admin'
}
    next()
} catch (error) {
    res.json(error)
}
}

module.exports=count