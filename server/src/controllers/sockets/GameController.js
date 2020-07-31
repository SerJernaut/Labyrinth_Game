const WebSocket = require('./WebSocket');
const {SOCKET: {JOIN_GAME_ROOM}} = require('../../constants')

class GameController extends WebSocket{

    /**@override*/
    anotherSubscribes (socket) {

    }

    emitJoinGame (gameRoomData) {
        this.io.emit(JOIN_GAME_ROOM,
            gameRoomData)
    }

}

module.exports = GameController;