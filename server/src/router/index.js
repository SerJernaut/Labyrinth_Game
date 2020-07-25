const {handleApplicationError, handleMongoError, handleValidationError} = require("../middlewares/errorHandlers");
const checkAuthorization = require('../middlewares/authorization/checkAuthorization');

const router = require('express')();
const authRouter = require('./auth');
const gameRouter = require('./game');

router.use(authRouter);
router.use(checkAuthorization);
router.use(gameRouter);
router.use(handleValidationError);
router.use(handleApplicationError);
router.use(handleMongoError);

module.exports = router;