const jwt = require('jsonwebtoken');
const CONSTANTS = require("../../../constants");
const {ApplicationError, AuthorizationError} = require( "../../../utils/errors");
const {RefreshToken} = require('../../../models/index');

module.exports.signToken = (tokenData, isRefresh) => {
    const token = jwt.sign(tokenData, CONSTANTS.SECRET, {
        expiresIn: isRefresh ? CONSTANTS.REFRESH_TOKEN_EXPIRES_TIME : CONSTANTS.ACCESS_TOKEN_EXPIRES_TIME
    });
    if (token) {
        return token;
    }
    else throw new ApplicationError ('can not generate token')
};

module.exports.verifyToken = async (token) => jwt.verify(token, CONSTANTS.SECRET);

module.exports.findRefreshTokenByPredicate = async predicate => {
    const foundedToken = await RefreshToken.findOne(predicate);
    if (foundedToken) {
        return foundedToken;
    }
    throw new ApplicationError('can not find refresh token');
}

module.exports.findRefreshTokenByPredicateWithUser = async predicate => {
    const foundedToken = await RefreshToken.findOne(predicate).populate('user');
    if (foundedToken) {
        return foundedToken;
    }
    throw new ApplicationError('can not find refresh token');
}

module.exports.createRefreshTokenByPredicate = async data => {
    const createdToken = await RefreshToken.create(data);
    if (createdToken) {
        return createdToken.toObject();
    }
    throw new ApplicationError('can not create refresh token');
}

module.exports.updateRefreshTokenByPredicate = async predicate => {
    const updatedRefreshToken = await RefreshToken.updateOne({predicate});
    if (!updatedRefreshToken) {
        throw new AuthorizationError();
    }
}