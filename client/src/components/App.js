import React, {lazy, Suspense, useEffect} from 'react';
import store from "../store";
import {createAuthRequestAction} from "../actions/actionCreators";
import CONSTANTS from "../constants";
import {Route} from "react-router-dom";
import privateHOC from "./PrivateHOC";
import GamePage from "./pages/GamePage";
import ForNotAuthorizedHOC from "./ForNotAuthorizedHOC";
import GameRoomCreationPage from "./pages/GameRoomCreationPage/GameRoomCreationPage";
import '../App.css'

const SignUpPage = lazy(() => import('./pages/AuthPages/SignUpPage/SignUpPage'));
const LoginPage = lazy(() => import('./pages/AuthPages/LoginPage/LoginPage'));


function App () {

    useEffect( () => {
        const refreshToken = localStorage.getItem(CONSTANTS.REFRESH_TOKEN_KEY)
        if (refreshToken) {
            store.dispatch(createAuthRequestAction());
        }
    }, []);


    return (
      <Suspense fallback={ <div>Loading...</div> }>
          <Route exact path='/' component={privateHOC(GamePage)}/>
          <Route path='/create_new_game' component={privateHOC(GameRoomCreationPage)}/>
          <Route path='/waiting_room/:id' component={privateHOC(GameRoomCreationPage)}/>
          <Route path={ '/sign_up' } component={ ForNotAuthorizedHOC(SignUpPage) }/>
          <Route path={ '/login' } component={ ForNotAuthorizedHOC(LoginPage) }/>
      </Suspense>
  );
}

export default App;
