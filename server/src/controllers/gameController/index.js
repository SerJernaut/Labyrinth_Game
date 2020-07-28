const gameQueries = require('../queries/gameQueries');



module.exports.createGameRoomDataAndSend = async (req, res, next) => {
    try {
        const {authorizationData: {_id: id}, body} = req;
        const gameRoomData = await gameQueries.createGameRoomDataByPredicate({owner: id, ...body}, id);
        const objGameRoomData = gameRoomData.toObject();
        const {boardCells, ...rest} = objGameRoomData;
        res.send (
                rest
        )
    } catch (e) {
        next(e);
    }
};

module.exports.getPaginatedGameRoomsAndSend = async (req, res, next) => {
    try{
        const {body: {skip, limit}} = req;
        const gameRoomsData = await gameQueries.getGameRoomsByPredicate({}, skip, limit);
        const filteredData = gameRoomsData.map(({boardCells, __v, ...rest})=> rest);
        res.send({filteredData, hasMore: limit <= filteredData.length})
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
        res.send(filteredData);
    }
    catch (e) {
        next(e)
    }
}

module.exports.checkIsUserInSomeRoomAndSendResult = async (req, res, next) => {
    try{
        const {authorizationData: {_id}} = req;
        const currentGameRoom= await gameQueries.checkIsUserInSomeRoom(_id);
        res.send(currentGameRoom);
    }
    catch(e) {
        next(e);
    }
}