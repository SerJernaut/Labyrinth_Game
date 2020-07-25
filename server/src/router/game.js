const gameController = require("../controllers/gameController");
const {GAME_ROOM_SCHEMA} = require("../utils/validation");
const {createValidationMW} = require("../middlewares/validation/createValidationMW");

const gameRouter = require('express').Router();

gameRouter.post('/create_game_room',
    createValidationMW(GAME_ROOM_SCHEMA),
    gameController.createGameRoomDataAndSend);

module.exports = gameRouter;