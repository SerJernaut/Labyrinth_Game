const {SOCKET: {CONNECTION, SUBSCRIBE, UNSUBSCRIBE}} = require('../../constants');

class WebSocket{
    connect (namespace, io) {
        this.io = io.of(namespace);
        this.listen();
    }

    listen () {
        this.io.on(CONNECTION, (socket) => {
            this.onSubscribe(socket);
            this.onUnsubscribe(socket);
            this.anotherSubscribes(socket);
        });
    }

    //this method should be overridden
    anotherSubscribes (socket) {

    }

    onSubscribe (socket) {
        socket.on(SUBSCRIBE, (id) => {
            console.log('hallo')
            socket.join(id);
        });
    }

    onUnsubscribe (socket) {
        socket.on(UNSUBSCRIBE, (id) => {
            socket.leave(id);
        });
    }
}

module.exports = WebSocket;