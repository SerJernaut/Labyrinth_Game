import React, {useState} from 'react';
import {Provider} from 'react-redux';
import store from './../../store/index';
import App from '../App';
import {initSocket} from "../../api/ws/SocketController";
import {BrowserRouter as Router, Route} from "react-router-dom";
import history from "../../history";

const Setup = props => {

        const [mainStore] = useState(initSocket(store))

        return(
            <Provider store={mainStore}>
                <Router history={ history }>
                    <Route path="/:filter?" component={ App }/>
                </Router>
            </Provider>
        )

}

export default Setup;