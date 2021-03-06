const CONSTANTS = {
    ACCESS_TOKEN_KEY: 'ACCESS_TOKEN_KEY',
    REFRESH_TOKEN_KEY: 'REFRESH_TOKEN_KEY',
    REST_API_URL: 'http://localhost:3001/api/',
    NODE_URL: 'http://localhost:3001/',
    GET_GAME_ROOMS_LIMIT: 10,
    GAME_ROOM_STATUS: {
        EXPECTED: 'EXPECTED',
        PLAYING: 'PLAYING',
        ENDED: 'ENDED'
    },
    SOCKET: {
        SUBSCRIBE: 'subscribe',
        UNSUBSCRIBE: 'unsubscribe',
        CONNECTION: 'connect',
        CREATE_GAME_ROOM: 'createGameRoom',
        JOIN_GAME_ROOM: 'joinGameRoom',
        SEND_JOINED_GAME_ROOM_PLAYER: 'sendJoinedGameRoomPlayer',
        SEND_LEFT_GAME_ROOM_PLAYER: 'sendLeftGameRoomPlayer',
        CHANGE_READY_STATUS: 'changeReadyStatus',
        LEAVE_GAME_ROOM: 'leaveGameRoom',
        SUBSCRIBE_GAME_ROOM: 'subscribeGameRoom',
        UNSUBSCRIBE_GAME_ROOM: 'unsubscribeGameRoom',
        REMOVE_GAME_ROOM: 'removeGameRoom',
        SEND_WINNER: 'sendWinner',
        SEND_BOARD_CELLS: 'sendBoardCells'
    },
    NUMBER_OF_PLAYERS: {
        MIN_GAME_PLAYERS: 2,
        MAX_GAME_PLAYERS: 5
    },
    MOVE_DIRECTION: {
        LEFT: 'LEFT',
        RIGHT: 'RIGHT',
        TOP: 'TOP',
        BOTTOM: 'BOTTOM'
    },
    HANDLE_KEYS: {
        LEFT: 'left',
        RIGHT: 'right',
        UP: 'up',
        DOWN: 'down'
    },
}

export default CONSTANTS;

