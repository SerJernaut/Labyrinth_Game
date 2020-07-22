const tokenQueries = require('../queries/tokenQueries');
const {AuthorizationError} = require( "../../utils/errors");


module.exports.signRefreshToken = async (req, res, next) => {
    try {
        const user = req.user || req.refreshToken.user;
        req.refreshTokenValue = tokenQueries.signToken({user}, true);
        next();
    } catch (e) {
        next(e);
    }
}


module.exports.signAccessToken = async (req, res, next) => {
    try {
        const user = req.user || req.refreshTokenPayload.user;
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

module.exports.findRefreshToken = async (req, res, next) => {
    try {
        const {
            body: {refreshToken: refreshTokenValue}, refreshTokenPayload: {user: {_id}}
        } = req;
        req.refreshToken = await tokenQueries.findRefreshTokenByPredicate({
            user: _id,
            value: refreshTokenValue,
        });
        next();
    } catch (e) {
        next(e);
    }
};

module.exports.findRefreshTokenWithUser = async (req, res, next) => {
    try {
        const {
            body: {refreshToken: refreshTokenValue}, refreshTokenPayload: {user: {_id}}
        } = req;

        req.refreshToken = await tokenQueries.findRefreshTokenByPredicateWithUser({
            user: _id,
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
        next(e);
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