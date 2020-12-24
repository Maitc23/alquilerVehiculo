const router = require('express').Router();
const {newCategory, listCategory, categoryById, removeCategory} = require('../controllers/category');
const verifyToken = require('../middlewares/verifyToken');

router.route('/category')
    .get(verifyToken,listCategory)
    .post(verifyToken, newCategory)

router.route('/category/:_id')
    .delete(verifyToken,removeCategory)
    .get(categoryById)





module.exports = router;