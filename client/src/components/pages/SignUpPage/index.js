import React from 'react';
import { Link } from 'react-router-dom';
import generateAuthForms from "../../../utils/generateAuthFormsComponents";


const SignUpForm = generateAuthForms(true, "registration");


const SignUpPage = () => {

  return (
    <>
      <Link to={ '/login' }>Login if you already have the account</Link>
        <SignUpForm/>
    </>
  );
};

export default SignUpPage;
