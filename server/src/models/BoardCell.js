const mongoose = require('mongoose');
const {modelRefs} = require("./modelRefs");
const Schema = mongoose.Schema;

const schema = {
    standingUsers: [modelRefs.userRef],
    hasTreasure: {
        type: Schema.Types.Boolean,
        required: true
    },
    usersWhoExplored: [modelRefs.userRef],
    cellIndex: {
        type: Schema.Types.Number,
        required: true,
        min: 0,
        max: 24
    }
};

const boardCellSchema = mongoose.Schema(schema, { versionKey: false });
const BoardCell = mongoose.model("BoardCell", boardCellSchema);

module.exports = {boardCellSchema, BoardCell};