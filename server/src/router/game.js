const gameController = require("../controllers/gameController");
const {GAME_ROOM_SCHEMA, LIMIT_SKIP_SCHEMA, GAME_ID_SCHEMA, SET_BOARD_CELLS_SCHEMA, START_GAME_SCHEMA} = require("../utils/validation");
const {createValidationMW} = require("../middlewares/validation/createValidationMW");
const onlyForGameRoomOwner = require('../middlewares/game/onlyForGameRoomOwner');
const userController = require('../controllers/userController/index');


const gameRouter = require('express').Router();

gameRouter.post('/create_game_room',
    createValidationMW(GAME_ROOM_SCHEMA),
    gameController.createGameRoomDataAndSend);

gameRouter.post('/get_game_rooms',
    createValidationMW(LIMIT_SKIP_SCHEMA),
    gameController.getPaginatedGameRoomsAndSend);

gameRouter.post('/join_game_room',
    createValidationMW(GAME_ID_SCHEMA),
    userController.setIsReadyFalseMW,
    gameController.joinGameRoomById);

gameRouter.get('/check_is_user_in_some_room',
    gameController.checkIsUserInSomeRoomAndSendResult);

gameRouter.post('/leave_game_room_by_id',
    createValidationMW(GAME_ID_SCHEMA),
    gameController.leaveGameRoomById);

gameRouter.post('/remove_game_room_by_id',
    createValidationMW(GAME_ID_SCHEMA),
    gameController.findGameRoomById,
    onlyForGameRoomOwner,
    gameController.removeGameRoomById);

gameRouter.post('/get_ready_player',
    createValidationMW(GAME_ID_SCHEMA),
    userController.setIsReadyTrueAndEmit);

gameRouter.post('/get_unready_player',
    createValidationMW(GAME_ID_SCHEMA),
    userController.setIsReadyFalseAndEmit);

gameRouter.post('/start_game',
    createValidationMW(START_GAME_SCHEMA),
    gameController.startGame,
    userController.setAllPlayersReadyNull);

gameRouter.post('/set_board_cells',
    createValidationMW(SET_BOARD_CELLS_SCHEMA),
    gameController.setBoardCellsAndEmit)

module.exports = gameRouter;