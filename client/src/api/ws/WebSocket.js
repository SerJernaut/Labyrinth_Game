import CONSTANTS from '../../constants';
import socketIoClient from 'socket.io-client';

class WebSocket {
    constructor(dispatch, getState, room) {
        this.dispatch = dispatch;
        this.getState = getState;
        this.socket = socketIoClient(`${CONSTANTS.NODE_URL}${room}`, {origins: "localhost:*"});
        this.listen();
    }

    listen = () => {
        this.socket.on(CONSTANTS.SOCKET.CONNECTION, () => {
            this.anotherSubscribes();
        });
    };

    //this method should be overridden
    anotherSubscribes (socket) {

    }
}

export default WebSocket;