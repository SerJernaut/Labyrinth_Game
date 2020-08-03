const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");
const {boardCellSchema} = require("./BoardCell");
const {modelRefs} = require("./modelRefs");
const Schema = mongoose.Schema;
const {GAME_STATUS} = require('../constants')

const schema = {
    gameStatus: {
        type: Schema.Types.String,
        enum: [GAME_STATUS.EXPECTED, GAME_STATUS.PLAYING, GAME_STATUS.ENDED],
        required: true,
        default: GAME_STATUS.EXPECTED
    },
    owner: { ...modelRefs.userRef, required: true},
    maxPlayers:  {
        type: Schema.Types.Number,
        required: true,
        min: 2,
        max: 5
    },
    areaSize: {
        type: Schema.Types.Number,
        enum: [9, 16, 25],
        required: true,
    },
    players: [{...modelRefs.userRef, unique: true, required: true}],
    whoseMove: { ...modelRefs.userRef, required: false},
    boardCells: [boardCellSchema],
    treasureBelongsToUser: {...modelRefs.userRef}
};

const gameSchema = mongoose.Schema(schema);
autoIncrement.initialize(mongoose.connection);
gameSchema.plugin(autoIncrement.plugin, "Game");
const Game = mongoose.model("Game", gameSchema);


module.exports = Game;