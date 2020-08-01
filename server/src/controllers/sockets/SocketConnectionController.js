const socketIo = require('socket.io');
const AppController = require('./AppController');
const GameController = require('./GameController');

class SocketConnectionController {
    constructor(httpServer) {
        this.io = socketIo.listen(httpServer);
        this._appController = new AppController();
        this._gameController = new GameController();
        this._appController.connect('/app', this.io);
        this._gameController.connect('/gameRoom', this.io);
    }

    get appController() {
        return this._appController;
    }

    get gameController() {
        return this._gameController;
    }

}

module.exports = SocketConnectionController;