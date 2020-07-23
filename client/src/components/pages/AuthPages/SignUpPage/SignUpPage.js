import React from 'react';
import { Link } from 'react-router-dom';
import generateAuthForms from "../../../../utils/generateAuthFormsComponents";
import styles from "../AuthPage.module.sass";


const SignUpForm = generateAuthForms(true, "registration");

const SignUpPage = () => {

    return (
        <div className={styles.pageContainer}>
            <h3>
                Labyrinth - ONLINE GAME
            </h3>
            <Link to={ '/login' }>Login if u have account</Link>
            <SignUpForm/>
        </div>
    );
};

export default SignUpPage;
