import GameSocketController from "../GameSocketController";

export let gameController;

export const initSocket = (store) => {
    gameController = new GameSocketController(store.dispatch, store.getState, 'game');
    return store;
};