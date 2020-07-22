import React, {lazy, Suspense, useEffect} from 'react';
import {Route} from "react-router-dom";
import store from "../store";
import {createAuthRequestAction} from "../actions/actionCreators";
import CONSTANTS from "../constants";

const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));


function App () {

    useEffect( () => {
        const refreshToken = localStorage.getItem(CONSTANTS.REFRESH_TOKEN_KEY)
        if (refreshToken) {
            store.dispatch(createAuthRequestAction());
        }
    }, []);


    return (
      <Suspense fallback={ <div>Loading...</div> }>
        <Route  path={ '/sign_up' } component={ SignUpPage }/>
        <Route   path={ '/login' } component={ LoginPage }/>
      </Suspense>
  );
}

export default App;
