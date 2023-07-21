const express = require('express')
const userController = require('../app/controller/userController')
const count = require('../app/middleware/count')
const companyController = require('../app/controller/companyController')
const authenticateUser = require('../app/middleware/authenticateUser')
const authorizeUser = require('../app/middleware/authorization')
const chargingOptionController = require('../app/controller/chargingOptionController')
const stationController = require('../app/controller/stationController')
const bookingController = require('../app/controller/bookingController')
const carsController = require('../app/controller/carsController')
const profileController = require('../app/controller/profileController')
const router = express.Router()

//user Routes
router.post('/user/register', count, userController.register)
router.post('/user/login', userController.login)
//user List 
router.get('/user/list', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, userController.list)
// //edit user info
// router.put('/user/update/:id', authenticateUser, (req, res, next) => {

//     req.permittedRoles = ['admin']
//     next()
// }, authorizeUser, userController.update)
router.get('/user/Info', authenticateUser, userController.info)

//Company Routes
router.post('/company/register', authenticateUser, (req, res, next) => {

    req.permittedRoles = ['admin']
    next()
}, authorizeUser, companyController.register)

//list all company
router.get('/company/register', authenticateUser, (req, res, next) => {

    req.permittedRoles = ['admin']
    next()
}, authorizeUser, companyController.list)
//upadate company
router.put('/company/update/:id', authenticateUser, (req, res, next) => {

    req.permittedRoles = ['admin']
    next()
}, authorizeUser, companyController.update)
//Delete Company
router.delete('/company/delete/:id', authenticateUser, (req, res, next) => {

    req.permittedRoles = ['admin']
    next()
}, authorizeUser, companyController.destroy)


//STATION
//create station
router.post('/api/station', authenticateUser, (req, res, next) => {

    req.permittedRoles = ['admin','staff']
    next()
}, authorizeUser, stationController.create)
//get specific station details 
router.get('/api/station/:id', authenticateUser, (req, res, next) => {

    req.permittedRoles = ['admin','staff']
    next()
}, authorizeUser, stationController.show)
//get all station details 
router.get('/api/station', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin','Customer']
    next()
}, authorizeUser, stationController.list)
//update station details
router.put('/api/station/:id', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, stationController.update)
//Delete the charging station based on the station Id
// router.delete('/api/station/:id', authenticateUser, (req, res, next) => {
//     req.permittedRoles = ['admin']
//     next()
// }, authorizeUser, stationController.destroy)
//delete station and that related charging options also delete
router.delete('/api/station/:id', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, stationController.deletemany)
//find station on staff name
router.get('/station/staffname',authenticateUser, (req, res, next) => {
    req.permittedRoles = ['staff']
    next()
}, authorizeUser, stationController.findOnStaffName)

//CHARGINGOPTION
router.post('/station/chargingOption', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, chargingOptionController.create)
//list all the charing options
router.get('/station/chargingOption/list', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, chargingOptionController.list)
//show the all charging option related station:id
router.get('/station/chargingOption/show/:stationId', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, chargingOptionController.show)
//update the charging option related station:id
router.put('/station/chargingOption/update/:id', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, chargingOptionController.update)
//delete charging option
router.delete('/station/chargingOption/destroy/:id', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, chargingOptionController.destroy)


//Booking Api's
router.post('/api/booking', authenticateUser, bookingController.create)
router.get('/api/booking/:id', authenticateUser, bookingController.show)
router.delete('/api/booking/:id', authenticateUser, bookingController.destroy)
router.get('/api/booking', authenticateUser, bookingController.showAll)

//cars Routes
//create cars
router.post('/api/cars', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, carsController.create)
//list the all cars based on companyId
router.get('/api/cars/:companyId', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, carsController.list)
//delete car details
router.delete('/api/cars/:id', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, carsController.destroy)
//update car details
router.put('/api/cars/:id', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, carsController.update)


//PROFILE
//create user profiler
router.post('/api/profiler', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, profileController.create)
//list profile
router.get('/api/profiler/:id', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, profileController.list)
//destroy the profile
router.delete('/api/profiler/:id', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, profileController.destroy)
module.exports = router