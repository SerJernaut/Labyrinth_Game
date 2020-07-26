import React from 'react';
import {Link} from "react-router-dom";
import Button from "../../Button/Button";
import styles from './GameRoomsListPage.module.sass';
import GameRoomsList from "../../GameRoomsList/GameRoomsList";

const GameRoomsListPage = () => {

    return (
        <div className={styles.pageContainer}>
            <Link className='primaryLink' to={ '/create_new_game_room' }><Button>
                Create new game room
            </Button></Link>
            <GameRoomsList/>
        </div>
    );
};

export default GameRoomsListPage;
