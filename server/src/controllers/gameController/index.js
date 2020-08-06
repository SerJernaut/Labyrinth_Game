const gameQueries = require('../queries/gameQueries');
const socketController = require("../../app");
const {GAME_STATUS} = require('../../constants')
const userQueries = require('../queries/userQueries')

module.exports.createGameRoomDataAndSend = async (req, res, next) => {
    try {
        const {authorizationData: {_id: id}, body} = req;
        const gameRoomData = await gameQueries.createGameRoomDataByPredicate({owner: id, ...body}, id);
        const objGameRoomData = gameRoomData.toObject();
        socketController.socketController.appController.emitCreateGameRoom(objGameRoomData, true);
        objGameRoomData.isOwner = true;
        objGameRoomData.isCurrentRoom = true;
        res.send (
            objGameRoomData
        )
    } catch (e) {
        next(e);
    }
};

module.exports.getPaginatedGameRoomsAndSend = async (req, res, next) => {
    try{
        const {body: {skip, limit}, authorizationData: {_id}} = req;
        const gameRoomsData = await gameQueries.getGameRoomsByPredicate({}, skip, limit);
        if (skip === 0) {
            const firstGameRoomData = gameRoomsData[0];
            if (firstGameRoomData) {
                firstGameRoomData.isCurrentRoom = !!firstGameRoomData.players.find(p => p == _id);
                firstGameRoomData.isOwner = firstGameRoomData.owner._id == _id
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
        socketController.socketController.appController.emitJoinGameRoom(updatedRoomData);
        const newPlayerNickName = updatedRoomData.players[updatedRoomData.players.length - 1].nickName;
        socketController.socketController.gameController.emitSendJoinedGameRoomPlayer(gameRoomId, newPlayerNickName);
        updatedRoomData.isCurrentRoom = true;
        updatedRoomData.isReady = false;
        res.send(updatedRoomData);
    }
    catch (e) {
        next(e)
    }
}

module.exports.checkIsUserInSomeRoomAndSendResult = async (req, res, next) => {
    try{
        const {authorizationData: {_id}} = req;
        const currentGameRoom = await gameQueries.checkIsUserInSomeRoom(_id);
        const player = currentGameRoom.players.find(player=> player._id == _id);
        currentGameRoom.isOwner = currentGameRoom.owner._id == _id;
        currentGameRoom.isReady = player.isReady;
        currentGameRoom.isCurrentRoom = currentGameRoom.gameStatus !== GAME_STATUS.ENDED;
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
        const leftGamePlayer = foundedGameRoomData.players.find(player=> player._id == _id);
        const filteredPlayers = foundedGameRoomData.players.filter(player=> player._id != _id);
        foundedGameRoomData.players = filteredPlayers;
        foundedGameRoomData.save();
        socketController.socketController.appController.emitLeaveGameRoom(filteredPlayers, gameRoomId);
        socketController.socketController.gameController.emitSendLeftGameRoomPlayer(gameRoomId, leftGamePlayer.nickName);
        res.send(filteredPlayers);
    }
    catch(e) {
        next(e);
    }
}

module.exports.findGameRoomById = async (req, res, next) => {
    try{
        const {body: {gameRoomId}} = req;
        req.foundedGameRoomData = await gameQueries.findGameRoomDataByPredicate({_id: gameRoomId});
        next();
    }
    catch(e) {
        next(e);
    }
}

module.exports.removeGameRoomById = async (req, res, next) => {
    try {
        const {body: {gameRoomId}} = req;
        await gameQueries.removeGameRoomByPredicate({_id: gameRoomId});
        socketController.socketController.appController.emitRemoveGameRoom(gameRoomId);
        res.end()
    }
    catch(e) {
        next(e);
    }
}

module.exports.startGame = async (req, res, next) => {
    try {
        const {body: {gameRoomId, boardCells}} = req;
        const gameData = await gameQueries.findGameRoomDataByPredicate({_id: gameRoomId});
        req.playersIdArr = gameData.players.map(({_id, ...rest})=> _id );
        gameData.boardCells = boardCells;
        gameData.gameStatus = GAME_STATUS.PLAYING;
        gameData.whoseMove = gameData.players[0]._id;
        gameData.save();
        next()
    }
    catch(e) {
        next(e);
    }
}

module.exports.setBoardCellsAndEmit = async (req, res, next) => {
    try{
        const {body: {gameRoomId, boardCells, whoseMove}, authorizationData: {_id}} = req;
        const gameData = await gameQueries.findGameRoomDataByPredicate({_id: gameRoomId});
        gameData.boardCells = boardCells;
        if (boardCells.find(boardCell=> boardCell.hasTreasure && !!boardCell.standingUsers.find(id=> id === _id))){
            const user = await userQueries.findUserByPredicate({_id});
            gameData.winner = _id;
            gameData.gameStatus = GAME_STATUS.ENDED;
            gameData.players = [];
            console.log(gameData.winner)
            gameData.save();
            socketController.socketController.gameController.emitSendBoardCells(gameRoomId, boardCells, null, user)
        }
        else {
            gameData.whoseMove = whoseMove._id;
            console.log(gameData.whoseMove)
            gameData.save();
            socketController.socketController.gameController.emitSendBoardCells(gameRoomId, boardCells, whoseMove, null)
        }
        res.end()
    }
    catch (e) {
        next(e);
    }
}
