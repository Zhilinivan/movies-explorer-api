const router = require('express').Router();
const signinValidation = require('../utils/validation/signinValidation');

const { loginUser } = require('../controllers/users');

router.post('/signin', signinValidation, loginUser);

module.exports = router;
