const router = require('express').Router();
const {newCategory, listCategory, categoryById, removeCategory} = require('../controllers/category');

router.route('/category')
    .get(listCategory)
    .post( newCategory)

router.route('/category/:_id')
    .delete(removeCategory)
    .get(categoryById)





module.exports = router;