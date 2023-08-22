const router = require('express').Router();

const NotFoundError = require('../utils/errors/notfounderror');

const routeUsers = require('./users');
const routeMovies = require('./movies');

const routeSignup = require('./signup');
const routeSignin = require('./signin');

const auth = require('../middlewares/auth');

router.use('/', routeSignup);
router.use('/', routeSignin);

router.use(auth);

router.use('/users', routeUsers);
router.use('/movies', routeMovies);

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена.'));
});

module.exports = router;
