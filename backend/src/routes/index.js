const router = require('express').Router(); 
const authRoutes = require('./auth'); 
const categoryRoutes = require('./category');
const vehiclesRoutes = require('./vehicle');

router.use('/', authRoutes); 
router.use('/', categoryRoutes);
router.use('/', vehiclesRoutes); 


module.exports = router;