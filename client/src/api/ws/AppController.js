import WebSocket from "./WebSocket";
import CONSTANTS from "../../constants";
import {
    createJoinGameRoomSuccessAction,
    createLeaveGameRoomSuccessAction,
    createRemoveGameRoomSuccessAction,
} from "../../actions/actionCreators";
const {SOCKET: {SUBSCRIBE, UNSUBSCRIBE, JOIN_GAME_ROOM, LEAVE_GAME_ROOM, REMOVE_GAME_ROOM}} = CONSTANTS

class AppController extends WebSocket{
    constructor(dispatch, getState, room) {
        super(dispatch, getState, room)
    }

    /**@override*/
    anotherSubscribes = () => {
        this.onJoinGameRoom();
        this.onLeaveGameRoom();
        this.onRemoveGameRoom();
    };

    subscribe = (id) => {
        this.socket.emit(SUBSCRIBE, id);
    };

    unsubscribe = (id) => {
        this.socket.emit(UNSUBSCRIBE, id);
    }

    onJoinGameRoom = () => {
        this.socket.on(JOIN_GAME_ROOM, (gameRoomData) => {
            this.dispatch(createJoinGameRoomSuccessAction(gameRoomData));
        })
    }

    onLeaveGameRoom = () => {
        this.socket.on(LEAVE_GAME_ROOM, (gameRoomData) => {
            this.dispatch(createLeaveGameRoomSuccessAction(gameRoomData.updatedRoomPlayers, gameRoomData.gameRoomId))
        })
    }

    onRemoveGameRoom = () => {
        this.socket.on(REMOVE_GAME_ROOM, (gameRoomId) => {
            this.dispatch(createRemoveGameRoomSuccessAction(gameRoomId))
        })
    }

}

export default AppController;