import React from 'react';
import { Link } from 'react-router-dom';
import generateAuthForms from "../../../../utils/generateAuthFormsComponents";
import styles from "../AuthPage.module.sass";


const SignUpForm = generateAuthForms(true, "registration");

const SignUpPage = () => {

    return (
        <div className={styles.pageContainer}>
            <Link className='primaryLink' to={ '/login' }>Login if u have account</Link>
            <SignUpForm/>
        </div>
    );
};

export default SignUpPage;
