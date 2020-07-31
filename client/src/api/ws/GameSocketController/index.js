import WebSocket from "../WebSocket";
import CONSTANTS from "../../../constants";
const {SOCKET: {SUBSCRIBE, UNSUBSCRIBE}} = CONSTANTS

class GameSocketController extends WebSocket{
    constructor(dispatch, getState, room) {
        super(dispatch, getState, room)
    }

    /**@override*/
    anotherSubscribes = () => {

    };

    subscribe = (id) => {
        this.socket.emit(SUBSCRIBE, id);
    };

    unsubscribe = (id) => {
        this.socket.emit(UNSUBSCRIBE, id);
    }
}

export default GameSocketController;