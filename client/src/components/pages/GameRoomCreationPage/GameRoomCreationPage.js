import React from 'react';
import {Link} from "react-router-dom";
import GameRoomCreationForm from "../../forms/GameRoomCreationForm/GameRoomCreationForm";
import styles from './GameRoomCreationPage.module.sass';


const GameRoomCreationPage = ({history}) => {

    return (
        <div className={styles.pageContainer}>
            <GameRoomCreationForm history={history}/>
            <Link className='primaryLink' to={ '/' }>Show existing play rooms</Link>
        </div>
    );
};

export default GameRoomCreationPage;
