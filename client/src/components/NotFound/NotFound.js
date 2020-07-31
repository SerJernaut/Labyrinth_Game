import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.sass'

const NotFound = () => (
    <div className={styles.notFoundContainer}>
        <h1>404 - Not Found!</h1>
        <Link className="primaryLink" to="/">
            Go Home
        </Link>
    </div>
);

export default NotFound;