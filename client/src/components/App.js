import React, {lazy, Suspense} from 'react';
import './App.scss'
import {Route} from "react-router-dom";

const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));


function App () {


  return (
      <Suspense fallback={ <div>Loading...</div> }>
        <Route  path={ '/sign_up' } component={ SignUpPage }/>
        <Route   path={ '/login' } component={ LoginPage }/>
      </Suspense>
  );
}

export default App;
