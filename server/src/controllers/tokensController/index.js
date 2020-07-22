const tokenQueries = require('../queries/tokenQueries');
const {AuthorizationError} = require( "../../utils/errors");


module.exports.signRefreshTokenByUserId = async (req, res, next) => {
    try {
        const userObjId = req.user._id ;
        req.refreshTokenValue = tokenQueries.signToken({userObjId}, true);
        next();
    } catch (e) {
        next(e);
    }
}

module.exports.signRefreshTokenByRefreshTokenUserData = async (req, res, next) => {
    try {
        const userObjId = req.refreshToken.user._id;
        console.log(userObjId)
        req.refreshTokenValue = tokenQueries.signToken({userObjId}, true);
        next();
    } catch (e) {
        next(e);
    }
}


module.exports.signAccessToken = async (req, res, next) => {
    try {
        const {user} = req;
        req.accessTokenValue = await tokenQueries.signToken(user, false);
        next();
    } catch (e) {
        next(e);
    }
};

module.exports.createRefreshToken = async (req, res, next) => {
    try {
        const {refreshTokenValue, user: {_id}} = req;
        await tokenQueries.createRefreshTokenByPredicate( {
            user: _id,
            value: refreshTokenValue,
        } );
        next();
    } catch (e) {
        next(e);
    }
};

module.exports.verifyRefreshToken = async (req, res, next) => {
    try {
        const {body: {refreshToken}} = req;
        req.refreshTokenPayload = await tokenQueries.verifyToken(refreshToken);
        next();
    } catch (e) {
        next(e);
    }
};

module.exports.findRefreshTokenWithUser = async (req, res, next) => {
    try {
        const {
            body: {refreshToken: refreshTokenValue}, refreshTokenPayload: {userObjId}
        } = req;

        req.refreshToken = await tokenQueries.findRefreshTokenByPredicate({
            user: userObjId,
            value: refreshTokenValue,
        });
        next();
    } catch (e) {
        next(e);
    }
};

module.exports.updateRefreshToken = async (req, res, next) => {
    try{
        const { refreshToken, refreshTokenValue } = req;
        refreshToken.value = refreshTokenValue;
        await refreshToken.save();
        next();
    }
    catch(e) {
        next(new AuthorizationError())
    }
};

module.exports.getUserByRefreshToken = async (req, res, next) => {
    try{
        const { refreshToken, refreshTokenValue } = req;
        refreshToken.value = refreshTokenValue;
        await refreshToken.save();
        next();
    }
    catch(e) {
        next(new AuthorizationError())
    }
};