const {Game} = require('../../../models/index');
const { ApplicationError } = require('../../../utils/errors');

module.exports.createPreparingGameDataByPredicate = async predicate => {
    const createdGame = await Game.create(predicate);
    if (createdGame) {
        return createdGame.toObject();
    }
    throw new ApplicationError('can not create game room');
}