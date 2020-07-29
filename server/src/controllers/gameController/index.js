const gameQueries = require('../queries/gameQueries');



module.exports.createGameRoomDataAndSend = async (req, res, next) => {
    try {
        const {authorizationData: {_id: id}, body} = req;
        const gameRoomData = await gameQueries.createGameRoomDataByPredicate({owner: id, ...body}, id);
        const objGameRoomData = gameRoomData.toObject();
        const {boardCells, _v, ...rest} = objGameRoomData;
        res.send (
                rest
        )
    } catch (e) {
        next(e);
    }
};

module.exports.getPaginatedGameRoomsAndSend = async (req, res, next) => {
    try{
        const {body: {skip, limit}, authorizationData: {_id}} = req;
        let gameRoomsData = await gameQueries.getGameRoomsByPredicate({}, skip, limit);
        gameRoomsData = gameRoomsData.map(({boardCells, __v, ...rest})=> rest);
        if (skip === 0) {
            gameRoomsData[0] && gameRoomsData[0].players.forEach(player => {
                gameRoomsData[0].isCurrentRoom = player == _id;
            })
            if (gameRoomsData[0].players.length === 0) {
                gameRoomsData[0].isCurrentRoom = false;
            }
        }
        res.send({gameRoomsData, hasMore: limit <= gameRoomsData.length})
    }
    catch (e) {
        next(e)
    }
}

module.exports.joinGameRoomById = async (req, res, next) => {
    try{
        const {body: {gameRoomId}, authorizationData: {_id}} = req;
        const updatedRoomData = await gameQueries.updateGameRoomByPredicate({_id: gameRoomId}, {
            $push: {players: _id}
        });
        const filteredData = ((({boardCells, ...rest})=> rest)(updatedRoomData));
        filteredData.isCurrentRoom = true;
        res.send(filteredData);
    }
    catch (e) {
        next(e)
    }
}

module.exports.checkIsUserInSomeRoomAndSendResult = async (req, res, next) => {
    try{
        const {authorizationData: {_id}} = req;
        const currentGameRoom = await gameQueries.checkIsUserInSomeRoom(_id);
        currentGameRoom.isCurrentRoom = true;
        res.send(currentGameRoom);
    }
    catch(e) {
        next(e);
    }
}

module.exports.leaveGameRoomById = async (req, res, next) => {
    try{
        const {authorizationData: {_id}, body: {gameRoomId}} = req;
        const foundedGameRoomData = await gameQueries.findGameRoomDataByPredicate({_id: gameRoomId});
        const filteredPlayers = foundedGameRoomData.players.filter(player=> player != _id);
        foundedGameRoomData.players = filteredPlayers;
        foundedGameRoomData.save();
        res.send(filteredPlayers);
    }
    catch(e) {
        next(e);
    }
}