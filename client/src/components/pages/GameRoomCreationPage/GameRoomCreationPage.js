import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import GameRoomCreationForm from "../../forms/GameRoomCreationForm/GameRoomCreationForm";
import styles from './GameRoomCreationPage.module.sass';
import {connect} from "react-redux";
import {
    createCheckIsUserInSomeRoomRequestAction,
} from "../../../actions/actionCreators";
import PropTypes from 'prop-types';
import { useLastLocation } from 'react-router-last-location';


const GameRoomCreationPage = ({gameRoomsData, history, isFetching, checkIsUserInSomeRoom}) => {

    const lastLocation = useLastLocation();

    useEffect(()=> {
        !isFetching && checkIsUserInSomeRoom();
    }, [])

    useEffect(()=> {

        if(!lastLocation && gameRoomsData && gameRoomsData.size > 0 && [...gameRoomsData.values()][0] && [...gameRoomsData.values()][0].isCurrentRoom) {
            history.replace('/')}
    });

    return (
        <div className={styles.pageContainer}>
            <GameRoomCreationForm history={history}/>
            <Link className='primaryLink' to={ '/' }>Show existing play rooms</Link>
        </div>
    );
};

const mapStateToProps = state => state.gameRoomsStore;

const mapDispatchToProps = dispatch => ({
    checkIsUserInSomeRoom: () => dispatch(createCheckIsUserInSomeRoomRequestAction())
})

GameRoomCreationPage.propTypes = {
    gameRoomsData: PropTypes.instanceOf(Map).isRequired,
    history: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    checkIsUserInSomeRoom: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(GameRoomCreationPage);
