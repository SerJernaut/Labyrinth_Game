import WebSocket from "../WebSocket";

class GameSocket extends WebSocket{
    constructor(dispatch, getState, room) {
        super(dispatch, getState, room)
    }

   anotherSubscribes = () => {

   }

}

export default GameSocket;