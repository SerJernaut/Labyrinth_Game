const gameController = require("../controllers/gameController");
const {GAME_ROOM_SCHEMA, LIMIT_SKIP_SCHEMA, GAME_ID_SCHEMA} = require("../utils/validation");
const {createValidationMW} = require("../middlewares/validation/createValidationMW");

const gameRouter = require('express').Router();

gameRouter.post('/create_game_room',
    createValidationMW(GAME_ROOM_SCHEMA),
    gameController.createGameRoomDataAndSend);

gameRouter.post('/get_game_rooms',
    createValidationMW(LIMIT_SKIP_SCHEMA),
    gameController.getPaginatedGameRoomsAndSend);

gameRouter.post('/join_game_room',
    createValidationMW(GAME_ID_SCHEMA),
    gameController.joinGameRoomById
    );

gameRouter.get('/check_is_user_in_some_room',
    gameController.checkIsUserInSomeRoomAndSendResult
    );

module.exports = gameRouter;