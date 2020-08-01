import WebSocket from "./WebSocket";
import CONSTANTS from "../../constants";
import {createJoinGameRoomSuccessAction, createLeaveGameRoomSuccessAction,} from "../../actions/actionCreators";
const {SOCKET: {SUBSCRIBE, UNSUBSCRIBE, JOIN_GAME_ROOM, LEAVE_GAME_ROOM, SEND_JOINED_GAME_ROOM_PLAYER}} = CONSTANTS

class AppController extends WebSocket{
    constructor(dispatch, getState, room) {
        super(dispatch, getState, room)
    }

    /**@override*/
    anotherSubscribes = () => {
        this.onJoinGameRoom();
        this.onLeaveGameRoom();
    };

    subscribe = (id) => {
        this.socket.emit(SUBSCRIBE, id);
    };

    unsubscribe = (id) => {
        this.socket.emit(UNSUBSCRIBE, id);
    }

    onJoinGameRoom = () => {
        this.socket.on(JOIN_GAME_ROOM, (data) => {
            this.dispatch(createJoinGameRoomSuccessAction(data));
        })
    }

    onLeaveGameRoom = () => {
        this.socket.on(LEAVE_GAME_ROOM, (data) => {
            this.dispatch(createLeaveGameRoomSuccessAction(data.updatedRoomPlayers, data.gameRoomId))
        })
    }

}

export default AppController;