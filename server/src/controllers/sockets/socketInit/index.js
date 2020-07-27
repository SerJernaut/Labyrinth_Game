const socketIo = require('socket.io');
const GameController = require('../GameController');

class SocketController {
    constructor(httpServer) {
        this.io = socketIo.listen(httpServer);
        this._gameController = new GameController();
        this._gameController.connect('/game', this.io);
    }

    get gameController() {
        return this._gameController;
    }

}

module.exports = SocketController;
