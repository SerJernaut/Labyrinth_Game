import AppController from "./AppController";
import GameController from "./GameController";

export let appController;
export let gameController;

export const initSocket = (store) => {
    appController = new AppController(store.dispatch, store.getState, 'app');
    gameController = new GameController(store.dispatch, store.getState, 'gameRoom')
    return store;
};