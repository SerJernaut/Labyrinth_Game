import WebSocket from "../WebSocket";
import CONSTANTS from "../../../constants";
import {createJoinGameRoomSuccessAction} from "../../../actions/actionCreators";
const {SOCKET: {SUBSCRIBE, UNSUBSCRIBE, JOIN_GAME_ROOM}} = CONSTANTS

class GameSocketController extends WebSocket{
    constructor(dispatch, getState, room) {
        super(dispatch, getState, room)
    }

    /**@override*/
    anotherSubscribes = () => {
        this.joinGameRoom()
    };

    subscribe = (id) => {
        this.socket.emit(SUBSCRIBE, id);
    };

    unsubscribe = (id) => {
        this.socket.emit(UNSUBSCRIBE, id);
    }

    joinGameRoom = () => {
        this.socket.on(JOIN_GAME_ROOM, (data) => {
            this.dispatch(createJoinGameRoomSuccessAction(data));
        })
    }

}

export default GameSocketController;