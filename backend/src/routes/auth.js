const router = require('express').Router();
const {login, register, me, deleteAccount, tokenIsValid} = require('../controllers/auth'); 
const verifyToken = require('../middlewares/verifyToken');



router.route('/register')
    .post(register)

router.route('/login')
    .post(login)


router.route('/me')
    .get(verifyToken, me)


router.route('/delete')
    .delete(verifyToken, deleteAccount)

router.route('/tokenIsValid')
    .post(tokenIsValid)

module.exports = router