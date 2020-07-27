const WebSocket = require('../WebSocket');
const CONSTANTS = require('../../../constants')

class GameSocketController extends WebSocket{

    anotherSubscribes (socket) {
        this.onNewGameRoom(socket)
    }

    onNewGameRoom (socket) {
        socket.on(CONSTANTS.SOCKET.NEW_GAME_ROOM, gameRoomData=> {
            socket.broadcast.emit(CONSTANTS.SOCKET.NEW_GAME_ROOM, gameRoomData)
        })
    }
}

module.exports = GameSocketController;