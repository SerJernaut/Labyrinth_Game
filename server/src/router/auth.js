const {AUTHENTICATE_USER_SCHEMA} = require("../utils/validation");
const {createValidationMW} = require("../middlewares/validation/createValidationMW");
const authRouter = require('express').Router();
const userController = require('../controllers/userController/index');
const tokensController = require('../controllers/tokensController/index');
const sendUserAndTokenPair = require('../middlewares/authentication/sendUserAndTokenPair');
const sendTokenPair = require('../middlewares/authentication/sendTokenPair');


authRouter.post('/sign_up',
    createValidationMW(AUTHENTICATE_USER_SCHEMA),
    userController.createUser,
    tokensController.signRefreshToken,
    tokensController.createRefreshToken,
    tokensController.signAccessToken,
    sendUserAndTokenPair,
    );


authRouter.post('/login',
    createValidationMW(AUTHENTICATE_USER_SCHEMA),
    userController.findUserByNickName,
    userController.checkIsPasswordRight,
    tokensController.signRefreshToken,
    tokensController.createRefreshToken,
    tokensController.signAccessToken,
    sendUserAndTokenPair
);

authRouter.post(
    '/refresh_tokens',
    tokensController.verifyRefreshToken,
    tokensController.findRefreshTokenWithUser,
    tokensController.signRefreshToken,
    tokensController.updateRefreshToken,
    tokensController.signAccessToken,
    sendTokenPair,
);

authRouter.post(
    '/refresh_sign_in',
    tokensController.verifyRefreshToken,
    tokensController.findRefreshTokenWithUser,
    tokensController.signRefreshToken,
    tokensController.updateRefreshToken,
    tokensController.signAccessToken,
    sendUserAndTokenPair,
);

module.exports = authRouter;