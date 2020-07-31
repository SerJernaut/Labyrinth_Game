import React, {useState} from 'react';
import {Provider} from 'react-redux';
import store from './../../store/index';
import App from '../App';
import {initSocket} from "../../api/ws/initSocket";
import {BrowserRouter as Router, Route} from "react-router-dom";
import history from "../../history";
import {LastLocationProvider} from "react-router-last-location";

const Setup = () => {

        const [mainStore] = useState(initSocket(store))

        return(
            <Provider store={mainStore}>
                <Router history={ history }>
                    <LastLocationProvider>
                    <Route path="/:filter?" component={ App }/>
                    </LastLocationProvider>
                </Router>
            </Provider>
        )

}

export default Setup;