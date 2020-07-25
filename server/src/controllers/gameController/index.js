const gameQueries = require('../queries/gameQueries')

module.exports.createGameRoomDataAndSend = async (req, res, next) => {
    try {
        const {authorizationData: {_id: id}, body} = req;
        let gameRoomData = await gameQueries.createGameRoomDataByPredicate({owner: id, ...body});
        gameRoomData = await gameRoomData.populate('owner', '-password').execPopulate();
        const {_id, gameStatus, owner, maxPlayers, areaSize} = gameRoomData;
        res.send (
            {
                _id, gameStatus, owner, maxPlayers, areaSize
            }
        )
    } catch (e) {
        next(e);
    }
};