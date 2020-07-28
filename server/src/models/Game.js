const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");
const {boardCellSchema} = require("./BoardCell");
const {modelRefs} = require("./modelRefs");
const Schema = mongoose.Schema;

const schema = {
    gameStatus: {
        type: Schema.Types.String,
        enum: ['EXPECTED', 'PLAYING', 'ENDED'],
        required: true,
        default: 'EXPECTED'
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
    players: [{...modelRefs.userRef, required: true}],
    boardCells: [boardCellSchema],
    treasureBelongsToUser: {...modelRefs.userRef}
};

const gameSchema = mongoose.Schema(schema);
autoIncrement.initialize(mongoose.connection);
gameSchema.plugin(autoIncrement.plugin, "Game");
const Game = mongoose.model("Game", gameSchema);


module.exports = Game;