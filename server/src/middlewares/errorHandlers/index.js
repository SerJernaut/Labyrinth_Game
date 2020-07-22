const { ApplicationError } = require('../../utils/errors');
const Joi = require('@hapi/joi');

function handleValidationError (err, req, res, next) {
    if (err instanceof Joi.ValidationError) {
        const { details: [{ message }] } = err;
        return res.status( 422 ).send( message );
    } else {
        next( err );
    }
}

function handleMongoError(err, req, res, next) {
    if (err.name==='MongoError') {
        return res.status( 400 ).send( err.errmsg );
    } else {
        next(err);
    }
}

function handleApplicationError (err, req, res, next) {
    if (err instanceof ApplicationError) {
        return res.status( err.status ).send( err.message );
    } else {
        next( err );
    }
}

module.exports = {
    handleApplicationError,
    handleValidationError,
    handleMongoError,
};