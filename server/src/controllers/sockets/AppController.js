const WebSocket = require('./WebSocket');
const {SOCKET: {CREATE_GAME_ROOM, JOIN_GAME_ROOM, LEAVE_GAME_ROOM, REMOVE_GAME_ROOM}} = require('../../constants')


class AppController extends WebSocket{

    /**@override*/
    anotherSubscribes (socket) {
    }

    emitCreateGameRoom (gameRoomData) {
        this.io.emit(CREATE_GAME_ROOM, gameRoomData)
    }

    emitJoinGameRoom (gameRoomData) {
        this.io.emit(JOIN_GAME_ROOM,
            gameRoomData);
    }

    emitLeaveGameRoom (updatedRoomPlayers, gameRoomId) {
        this.io.emit(LEAVE_GAME_ROOM,
            {updatedRoomPlayers, gameRoomId})
    }

    emitRemoveGameRoom (gameRoomId) {
        this.io.emit(REMOVE_GAME_ROOM, gameRoomId);
    }
}

module.exports = AppController;