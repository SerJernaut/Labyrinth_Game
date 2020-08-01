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
        JOIN_GAME_ROOM: 'joinGameRoom',
        LEAVE_GAME_ROOM: 'leaveGameRoom',
        SUBSCRIBE_GAME_ROOM: 'subscribeGameRoom',
        UNSUBSCRIBE_GAME_ROOM: 'unsubscribeGameRoom',
    },
    NUMBER_OF_PLAYERS: {
        MIN_GAME_PLAYERS: 2,
        MAX_GAME_PLAYERS: 5
    }
}

export default CONSTANTS;

