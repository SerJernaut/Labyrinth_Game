const {Game} = require('../../../models/index');
const { ApplicationError } = require('../../../utils/errors');

module.exports.createGameRoomDataByPredicate = async predicate => {
    let createdGame = await Game.create(predicate);
        createdGame = await createdGame.populate('owner', '-password -__v').execPopulate();
    if (createdGame) {
        return createdGame;
    }
    throw new ApplicationError('can not create game room');
}

module.exports.getGameRoomsByPredicate = async (predicate, skip, limit) => {
    const foundedGameRooms = await Game.find(predicate).lean().populate('owner', '-password -__v').skip(skip).limit(limit);
    if (foundedGameRooms) {
        return foundedGameRooms;
    }
    throw new ApplicationError('can not find game rooms');
}
