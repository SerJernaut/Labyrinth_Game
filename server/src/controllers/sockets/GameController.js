const WebSocket = require('./WebSocket');
const {SOCKET: {SUBSCRIBE_GAME_ROOM, UNSUBSCRIBE_GAME_ROOM, SEND_JOINED_GAME_ROOM_PLAYER, SEND_LEFT_GAME_ROOM_PLAYER, CHANGE_READY_STATUS}} = require('../../constants')


class GameController extends WebSocket{

    /**@override*/
    anotherSubscribes (socket) {
        this.onSubscribeGame(socket);
        this.onUnsubscribeGame(socket)
    }

    onSubscribeGame (socket) {
        socket.on(SUBSCRIBE_GAME_ROOM, (gameId)=> {
            socket.join(gameId)
        })
    }

    onUnsubscribeGame (socket) {
        socket.on(UNSUBSCRIBE_GAME_ROOM, (gameId)=> {
            socket.leave(gameId)
        })
    }

    emitSendJoinedGameRoomPlayer (gameRoomId, nickName) {
        this.io.to(gameRoomId).emit(SEND_JOINED_GAME_ROOM_PLAYER, nickName)
    }

    emitSendLeftGameRoomPlayer (gameRoomId, nickName) {
        this.io.to(gameRoomId).emit(SEND_LEFT_GAME_ROOM_PLAYER, nickName)
    }

    emitChangeReadyStatus (changedIsReadyStatus, gameRoomId, playerId) {
        this.io.to(gameRoomId).emit(CHANGE_READY_STATUS, {changedIsReadyStatus, gameRoomId, playerId})
    }
}

module.exports = GameController;