import WebSocket from "./WebSocket";
import CONSTANTS from "../../constants";
const {SOCKET: {SUBSCRIBE_GAME_ROOM, UNSUBSCRIBE_GAME_ROOM}} = CONSTANTS

class GameController extends WebSocket{
    constructor(dispatch, getState, room) {
        super(dispatch, getState, room)
    }

    /**@override*/
    anotherSubscribes = () => {

    };

    subscribeGameRoom = (id) => {
        this.socket.emit(SUBSCRIBE_GAME_ROOM, id);
    };

    unsubscribeGameRoom = (id) => {
        this.socket.emit(UNSUBSCRIBE_GAME_ROOM, id);
    }

}

export default GameController;