import WebSocket from "../WebSocket";
import CONSTANTS from "../../../constants";
import {createJoinGameRoomSuccessAction, createLeaveGameRoomSuccessAction,} from "../../../actions/actionCreators";
const {SOCKET: {SUBSCRIBE, UNSUBSCRIBE, JOIN_GAME_ROOM, LEAVE_GAME_ROOM}} = CONSTANTS

class GameSocketController extends WebSocket{
    constructor(dispatch, getState, room) {
        super(dispatch, getState, room)
    }

    /**@override*/
    anotherSubscribes = () => {
        this.joinGameRoom();
        this.leaveGameRoom();
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

    leaveGameRoom = () => {
        this.socket.on(LEAVE_GAME_ROOM, (data) => {
            console.log(data);
            this.dispatch(createLeaveGameRoomSuccessAction(data.updatedRoomPlayers, data.gameRoomId))
        })
    }

}

export default GameSocketController;