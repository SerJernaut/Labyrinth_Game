import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {createGetAllRoomsRequestAction} from "../../actions/actionCreators";
import PropTypes from 'prop-types';
import GameRoomItem from "../GameRoomItem/GameRoomItem";
import styles from './GameRoomsList.module.sass';

const GameRoomsList = ({isFetching, gameRoomsData, getAllGameRooms}) => {
    useEffect(()=> {
        !isFetching && getAllGameRooms();
    }, []);

    const arrOfGameRoomsData = [...gameRoomsData.values()];

    return (
        <div className={styles.listContainer}>
            <h1>Enter existing or create own game room</h1>
            {arrOfGameRoomsData.map((gameRoomData, index)=> <GameRoomItem key={index} gameRoomData={gameRoomData}/>)
            }
        </div>
    );
};

GameRoomsList.propTypes = {
    getAllGameRooms: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    gameRoomsData: PropTypes.instanceOf(Map).isRequired
};

const mapStateToProps = state => state.gameRoomsStore;
const mapDispatchToProps = dispatch => ({
    getAllGameRooms: ()=> dispatch(createGetAllRoomsRequestAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(GameRoomsList);