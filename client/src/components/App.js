import React, {lazy, Suspense, useEffect} from 'react';
import {createAuthRequestAction} from "../actions/actionCreators";
import CONSTANTS from "../constants";
import {Route, Switch} from "react-router-dom";
import privateHOC from "./PrivateHOC";
import ForNotAuthorizedHOC from "./ForNotAuthorizedHOC";
import '../App.css'
import NotFound from "./NotFound/NotFound";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

const SignUpPage = lazy(() => import('./pages/AuthPages/SignUpPage/SignUpPage'));
const LoginPage = lazy(() => import('./pages/AuthPages/LoginPage/LoginPage'));
const WaitingRoom = lazy(()=> import('./pages/WaitingRoom/WaitingRoom'));
const GameRoomCreationPage = lazy(()=> import('./pages/GameRoomCreationPage/GameRoomCreationPage'));
const GameRoomsListPage = lazy(()=> import('./pages/GameRoomsListPage/GameRoomsListPage'));


function App ({refreshSignIn}) {

    useEffect( () => {
        const refreshToken = localStorage.getItem(CONSTANTS.REFRESH_TOKEN_KEY)
        if (refreshToken) {
            refreshSignIn();
        }
    }, []);


    return (
        <Suspense fallback={ <div>Loading...</div> }>
            <Switch>
                <Route exact path='/' component={privateHOC(GameRoomsListPage)}/>
                <Route path='/create_new_game_room' component={privateHOC(GameRoomCreationPage)}/>
                <Route path='/waiting_room/:id' component={privateHOC(WaitingRoom)}/>
                <Route path={ '/sign_up' } component={ ForNotAuthorizedHOC(SignUpPage) }/>
                <Route path={ '/login' } component={ ForNotAuthorizedHOC(LoginPage) }/>
                <Route component={NotFound} />
            </Switch>
        </Suspense>
    );
}

const mapStateToProps = state => state.authStore;
const mapDispatchToProps = dispatch => ({
    refreshSignIn: () => dispatch(createAuthRequestAction())
})

App.propTypes = {
    refreshSignIn: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
