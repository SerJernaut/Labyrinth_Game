import React from 'react';
import {Link} from "react-router-dom";
import generateAuthForms from "../../../utils/generateAuthFormsComponents";

const LoginForm = generateAuthForms(false, "login");

const LoginPage = () => {

  return (
      <>
        <Link to={ '/sign_up' }>Sign up to play the game</Link>
          <LoginForm/>
    </>
  );
};

export default LoginPage;
