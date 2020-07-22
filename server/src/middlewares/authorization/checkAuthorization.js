const { AuthorizationError, AuthenticationTimeoutError }  = require('../../utils/errors') ;
const jwt                                             = require('jsonwebtoken');
const util  = require ('util');
const CONSTANTS = require("../../constants") ;

const verifyAsync = util.promisify( jwt.verify );

module.exports = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            req.authorizationData = await verifyAsync( req.headers.authorization, CONSTANTS.SECRET );
            return next();
        }
        next( new AuthorizationError() );
    } catch (e) {
        next( new AuthenticationTimeoutError() );
    }
}