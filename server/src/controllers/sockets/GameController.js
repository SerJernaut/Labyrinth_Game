const WebSocket = require('./WebSocket');
const {SOCKET: {SUBSCRIBE_GAME_ROOM, UNSUBSCRIBE_GAME_ROOM}} = require('../../constants')


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
}

module.exports = GameController;