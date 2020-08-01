const WebSocket = require('./WebSocket');
const {SOCKET: {JOIN_GAME_ROOM, LEAVE_GAME_ROOM, SEND_JOINED_GAME_ROOM_PLAYER}} = require('../../constants')


class AppController extends WebSocket{

    /**@override*/
    anotherSubscribes (socket) {
    }

    emitJoinGameRoom (gameRoomData) {
        this.io.emit(JOIN_GAME_ROOM,
            gameRoomData);
    }

    emitLeaveGameRoom (updatedRoomPlayers, gameRoomId) {
        this.io.emit(LEAVE_GAME_ROOM,
            {updatedRoomPlayers, gameRoomId})
    }
}

module.exports = AppController;