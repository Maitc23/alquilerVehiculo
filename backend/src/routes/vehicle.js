const router = require('express').Router();
const { newVehicle, listVehicles, vehicleById, rentVehicle, removeVehicle } = require('../controllers/vehicle');
const upload = require('../utils/storage');
const verifyToken = require('../middlewares/verifyToken');


router.route('/vehicles')
    .get(listVehicles)
    .post(verifyToken, upload.single('image'), newVehicle)

router.route('/vehicle/:_id')
    .delete(verifyToken, removeVehicle)
    .get(vehicleById)
    .put(verifyToken, rentVehicle)



module.exports = router; 