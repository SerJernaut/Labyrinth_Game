import WebSocket from "./WebSocket";
import CONSTANTS from "../../constants";
import {toast} from "react-toastify";
import {
    createChangeReadyStatusSuccessAction, createSetBoardCellsSuccessAction, createSetWinnerSuccessAction,
    createStartGameSuccessAction
} from "../../actions/actionCreators";

const {SOCKET: {
    SUBSCRIBE_GAME_ROOM,
    UNSUBSCRIBE_GAME_ROOM,
    SEND_JOINED_GAME_ROOM_PLAYER,
    SEND_LEFT_GAME_ROOM_PLAYER,
    CHANGE_READY_STATUS,
    SEND_BOARD_CELLS,
    SEND_WINNER}} = CONSTANTS

class GameController extends WebSocket{
    constructor(dispatch, getState, room) {
        super(dispatch, getState, room)
    }

    /**@override*/
    anotherSubscribes = () => {
        this.onSendJoinedGameRoomPlayer();
        this.onSendLeftGameRoomPlayer();
        this.onChangeReadyStatus();
        this.onSendBoardCells();
        this.onSendWinner();
    };

    subscribeGameRoom = (id) => {
        this.socket.emit(SUBSCRIBE_GAME_ROOM, id);
    };

    unsubscribeGameRoom = (id) => {
        this.socket.emit(UNSUBSCRIBE_GAME_ROOM, id);
    }

    onSendJoinedGameRoomPlayer = () => {
        this.socket.on(SEND_JOINED_GAME_ROOM_PLAYER, (newPlayerNickName)=> {
            toast.success(`${newPlayerNickName} joined the room`)
        })
    }

    onSendLeftGameRoomPlayer = () => {
        this.socket.on(SEND_LEFT_GAME_ROOM_PLAYER, (leftGamePlayerNickName)=> {
            toast.error(`${leftGamePlayerNickName} left the room`)
        })
    }

    onChangeReadyStatus = () => {
        this.socket.on(CHANGE_READY_STATUS, ({changedIsReadyStatus, gameRoomId, playerId})=> {
            this.dispatch(createChangeReadyStatusSuccessAction(changedIsReadyStatus, gameRoomId, playerId));
        })
    }

    onSendBoardCells = () => {
        this.socket.on(SEND_BOARD_CELLS, ({gameRoomId, boardCells, whoseMove})=> {
            if (!whoseMove) {
                this.dispatch(createStartGameSuccessAction(gameRoomId, boardCells))
            }
            else {
                this.dispatch(createSetBoardCellsSuccessAction(gameRoomId, boardCells, whoseMove))
            }
        })
    }

    onSendWinner = () => {
        this.socket.on(SEND_WINNER, ({gameRoomId, winner})=> {
            if (this.getState().authStore.user._id === winner._id) {
                toast.success('You found the treasure and won the game! Congratulations!')
            }
            else {
                toast.error(`${winner.nickName} won the game! You lost!`)
            }
            this.dispatch(createSetWinnerSuccessAction(gameRoomId, winner))
        })
    }
}

export default GameController;