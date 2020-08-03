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
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const SignUpPage = lazy(() => import('./pages/AuthPages/SignUpPage/SignUpPage'));
const LoginPage = lazy(() => import('./pages/AuthPages/LoginPage/LoginPage'));
const GameRoom = lazy(()=> import('./pages/GameRoom/GameRoom'));
const GameRoomCreationPage = lazy(()=> import('./pages/GameRoomCreationPage/GameRoomCreationPage'));
const GameRoomsListPage = lazy(()=> import('./pages/GameRoomsListPage/GameRoomsListPage'));


function App ({refreshSignIn, user}) {

    useEffect( () => {
        const refreshToken = localStorage.getItem(CONSTANTS.REFRESH_TOKEN_KEY)
        if (refreshToken) {
            refreshSignIn();
        }
    }, []);


    return (
        <Suspense fallback={ <div>Loading...</div> }>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />
            <h1 className="h1">Welcome, {user && user.nickName}</h1>
            <Switch>
                <Route exact path='/' component={privateHOC(GameRoomsListPage)}/>
                <Route path='/create_new_game_room' component={privateHOC(GameRoomCreationPage)}/>
                <Route path='/game_room/:id' component={privateHOC(GameRoom)}/>
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
