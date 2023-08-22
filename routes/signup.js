const router = require('express').Router();
const signupValidation = require('../utils/validation/signupValidation');

const { regUser } = require('../controllers/users');

router.post('/signup', signupValidation, regUser);

module.exports = router;
