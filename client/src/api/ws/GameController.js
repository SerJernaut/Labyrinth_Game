import WebSocket from "./WebSocket";
import CONSTANTS from "../../constants";
import {toast} from "react-toastify";

const {SOCKET: {SUBSCRIBE_GAME_ROOM, UNSUBSCRIBE_GAME_ROOM, SEND_JOINED_GAME_ROOM_PLAYER}} = CONSTANTS

class GameController extends WebSocket{
    constructor(dispatch, getState, room) {
        super(dispatch, getState, room)
    }

    /**@override*/
    anotherSubscribes = () => {
        this.onSendJoinedGameRoomPlayer();
    };

    subscribeGameRoom = (id) => {
        this.socket.emit(SUBSCRIBE_GAME_ROOM, id);
    };

    unsubscribeGameRoom = (id) => {
        this.socket.emit(UNSUBSCRIBE_GAME_ROOM, id);
    }

    onSendJoinedGameRoomPlayer = () => {
        this.socket.on(SEND_JOINED_GAME_ROOM_PLAYER, (data)=> {
            toast.success(`${data} joined the room`)
        })
    }
}

export default GameController;