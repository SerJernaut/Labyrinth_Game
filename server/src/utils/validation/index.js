const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid');
const {NICKNAME_PATTERN, PASSWORD_PATTERN, GET_GAME_ROOMS_LIMIT} = require( "../../constants");

const loginSchema = Joi.string()
    .pattern( NICKNAME_PATTERN );
const passwordSchema = Joi.string()
    .pattern( PASSWORD_PATTERN );

const userSchema = Joi.object( {
    nickName: loginSchema.label( 'NickName' ),
    password: passwordSchema.label( 'Password' ),
    profilePicture: Joi.any(),
} );

const AUTHENTICATE_USER_SCHEMA = userSchema.and(
    ...['nickName', 'password']);

const maxPlayersSchema = Joi.number().integer().min(2).max(5);
const areaSizeSchema = Joi.number().valid(9, 16, 25);

const gameRoomSchema = Joi.object( {
    maxPlayers: maxPlayersSchema.label( 'Max players' ),
    areaSize: areaSizeSchema.label( 'Area size' ),
} );

const GAME_ROOM_SCHEMA = gameRoomSchema.and(...['maxPlayers', 'areaSize']);

const limitSchema = Joi.number().valid(GET_GAME_ROOMS_LIMIT);
const skipSchema = Joi.number().integer();

const limitSkipSchema = Joi.object( {
    limit: limitSchema.label( 'Limit' ),
    skip: skipSchema.label( 'Skip' ),
} );

const LIMIT_SKIP_SCHEMA = limitSkipSchema.and(...['limit', 'skip']);

const gameIdSchema = Joi.number().integer();
const boardCellsSchema = Joi.array()
const objectSchema = Joi.object();

const GAME_ID_SCHEMA = Joi.object( {
    gameRoomId: gameIdSchema.label('Game id').required()
})

const setBoardCellsOrStartGameOrSetWinnerSchema = Joi.object( {
    gameRoomId: gameIdSchema.label('Game id'),
    boardCells: boardCellsSchema.label('Board cells'),
    whoseMove: objectSchema.label('Whose move'),
    winner: objectSchema.label('Winner')
})

const START_GAME_SCHEMA = setBoardCellsOrStartGameOrSetWinnerSchema.and(...['gameRoomId', 'boardCells']);
const SET_BOARD_CELLS_SCHEMA = setBoardCellsOrStartGameOrSetWinnerSchema.and(...['gameRoomId', 'boardCells', 'whoseMove']);
const SET_WINNER_SCHEMA = setBoardCellsOrStartGameOrSetWinnerSchema.and(...['gameRoomId', 'winner']);


module.exports = {
    AUTHENTICATE_USER_SCHEMA,
    GAME_ROOM_SCHEMA,
    LIMIT_SKIP_SCHEMA,
    GAME_ID_SCHEMA,
    START_GAME_SCHEMA,
    SET_BOARD_CELLS_SCHEMA,
    SET_WINNER_SCHEMA
}

