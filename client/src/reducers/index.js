import { combineReducers } from 'redux';
import authReducer from "./authReducer";
import preparingGameReducer from "./preparingGameReducer";


export default combineReducers({
    authStore: authReducer,
    preparingGameDataStore: preparingGameReducer
});