import GameSocket from "../GameSocket";

export let gameController;

export const initSocket = (store) => {
    gameController = new GameSocket(store.dispatch, store.getState, 'game');
    return store;
};