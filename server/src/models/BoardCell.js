const mongoose = require('mongoose');
const {modelRefs} = require("./modelRefs");
const Schema = mongoose.Schema;

const schema = {
    standingUsers: [...modelRefs.userRef],
    hasTreasure: {
        type: Schema.Types.Boolean,
        required: true
    },
    usersWhoExplored: [...modelRefs.userRef]
};

const boardCellSchema = mongoose.Schema(schema);
const BoardCell = mongoose.model("BoardCell", boardCellSchema);

module.exports = {boardCellSchema, BoardCell};