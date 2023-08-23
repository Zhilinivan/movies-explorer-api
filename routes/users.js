const router = require('express').Router();
const updateUserInfoValidation = require('../utils/validation/updateUserInfoValidation');

const {
  getUserInfo, updateUserInfo,
} = require('../controllers/users');

router.get('/users/me', getUserInfo);
router.patch('/users/me', updateUserInfoValidation, updateUserInfo);

module.exports = router;
