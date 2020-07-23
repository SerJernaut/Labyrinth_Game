import React from 'react';
import {Link} from "react-router-dom";
import generateAuthForms from "../../../../utils/generateAuthFormsComponents";
import styles from '../AuthPage.module.sass';

const LoginForm = generateAuthForms(false, "login");

const LoginPage = () => {

    return (
        <div className={styles.pageContainer}>
            <h3>
                Labyrinth - ONLINE GAME
            </h3>
            <Link to={ '/sign_up' }>Sign up to play the game</Link>
            <LoginForm/>
        </div>
    );
};

export default LoginPage;
