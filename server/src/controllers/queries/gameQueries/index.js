const {Game} = require('../../../models/index');
const { ApplicationError, NotFoundError } = require('../../../utils/errors');

module.exports.createGameRoomDataByPredicate = async (predicate, ownerId) => {
    let createdGame = await Game.create(predicate);
        createdGame.players.push(ownerId);
        createdGame.save();
        createdGame = await createdGame.populate('owner', '-password -__v').populate('players', '-password -__v').execPopulate();
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

module.exports.updateGameRoomByPredicate = async (findParam, updateParam) => {
    const updatedGame = await Game.findByIdAndUpdate(findParam, updateParam, {new: true}).lean().populate('owner', '-password -__v').populate('players', '-password -__v');
    if (updatedGame) {
        return updatedGame;
    }
    throw new ApplicationError('can not update the room')
}

module.exports.checkIsUserInSomeRoom = async (userId) => {
    const foundedGameRoom = await Game.findOne({players: {"$in": [userId]}}).lean().populate('owner', '-password -__v').populate('players', '-password -__v');
    if (foundedGameRoom) {
        return ((({__v, ...rest})=> rest) (foundedGameRoom))
    }
    throw new NotFoundError('can not find the room')
}

module.exports.findGameRoomDataByPredicate = async (predicate) => {
    const foundedGameRoom = await Game.findOne(predicate).populate('players', '-password -__v');
    if (foundedGameRoom) {
        return foundedGameRoom;
    }
    throw new ApplicationError('can not find game room');
}

module.exports.removeGameRoomByPredicate = async (predicate) => {
    const result = await Game.deleteOne(predicate);
    if (result) {
        return result;
    }
    throw new ApplicationError('can not delete game room')
}