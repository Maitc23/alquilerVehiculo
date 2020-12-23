const router = require('express').Router(); 
const {newVehicle, listVehicles, vehicleById, removeVehicle} = require('../controllers/vehicle');
const upload = require('../utils/storage');


router.route('/vehicles')
    .get(listVehicles)
    .post(upload.single('image'),newVehicle)

router.route('/vehicle/:_id')
    .delete(removeVehicle)
    .get(vehicleById)



module.exports = router; 