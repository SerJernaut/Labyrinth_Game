const WebSocket = require('./WebSocket');
const {SOCKET: {SUBSCRIBE_GAME_ROOM, UNSUBSCRIBE_GAME_ROOM, SEND_JOINED_GAME_ROOM_PLAYER, SEND_LEFT_GAME_ROOM_PLAYER}} = require('../../constants')


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
}

module.exports = GameController;