const mongoose = require('mongoose');
const {boardCellSchema} = require("./BoardCell");
const {modelRefs} = require("./modelRefs");
const Schema = mongoose.Schema;

const schema = {
    gameStatus: {
        type: Schema.Types.String,
        enum: ['EXPECTED', 'PLAYING', 'ENDED'],
        required: true
    },
    owner: { ...modelRefs.userRef, required: true},
    maxPlayers:  {
        type: Schema.Types.Number,
        required: true,
    },
    areaSize: {
        type: Schema.Types.Number,
        enum: [9, 16, 25],
        required: true,
    },
    players: [modelRefs.userRef],
    boardCells: [boardCellSchema],
    treasureBelongsToUser: {...modelRefs.userRef}
};

const gameSchema = mongoose.Schema(schema);
const Game = mongoose.model("Game", gameSchema);

module.exports = Game;