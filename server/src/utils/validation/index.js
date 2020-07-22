const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid');
const {LOGIN_PATTERN, PASSWORD_PATTERN} = require( "../../constants");

const loginSchema = Joi.string()
    .pattern( LOGIN_PATTERN );
const passwordSchema = Joi.string()
    .pattern( PASSWORD_PATTERN );

const userSchema = Joi.object( {
    nickName: loginSchema.label( 'NickName' ),
    password: passwordSchema.label( 'Password' ),
    profilePicture: Joi.any(),
} );

const AUTHENTICATE_USER_SCHEMA = userSchema.and(
    ...['nickName', 'password']);

module.exports = {
    AUTHENTICATE_USER_SCHEMA,
}

