const gameController = require("../controllers/gameController");
const {PREPARING_GAME_DATA_SCHEMA} = require("../utils/validation");
const {createValidationMW} = require("../middlewares/validation/createValidationMW");

const gameRouter = require('express').Router();

gameRouter.post('/create_preparing_game_data',
    createValidationMW(PREPARING_GAME_DATA_SCHEMA),
    gameController.createPreparingGameDataAndSend);

module.exports = gameRouter;