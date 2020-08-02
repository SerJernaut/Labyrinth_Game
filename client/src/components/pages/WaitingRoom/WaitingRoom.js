import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {
    createChangeReadyStatusRequestAction,
    createCheckIsUserInSomeRoomRequestAction,
    createLeaveGameRoomRequestAction,
    createRemoveGameRoomRequestAction,
} from "../../../actions/actionCreators";
import PropTypes from 'prop-types';
import styles from "./WaitingRoom.module.sass";
import classNames from "classnames";
import CONSTANTS from "../../../constants";
import Button from "../../Button/Button";
import {Link} from "react-router-dom";
import {gameController} from "../../../api/ws/initSocket";


const WaitingRoom = ({history, match, error, gameRoomsData, isFetching, checkIsUserInSomeRoom, leaveGameRoom, removeGameRoom, changeReady}) => {

    useEffect(()=> {
        gameRoomsData
        && gameRoomsData.size === 0
        && !isFetching
        && checkIsUserInSomeRoom();
    }, []);

    useEffect(()=> {
        if((error && error.status === 404) ||
            (gameRoomsData && gameRoomsData.size > 0 &&
                [...gameRoomsData.values()][0]._id !== +match.params.id)) {
            history.replace('/')}
        else {
            gameRoomsData && gameRoomsData.size > 0 && gameController.subscribeGameRoom([...gameRoomsData.values()][0]._id);
        }

        return () => gameRoomsData && gameRoomsData.size > 0 && gameController.unsubscribeGameRoom([...gameRoomsData.values()][0]._id);
    });

    if (gameRoomsData.size === 0) {return null}

    const {_id, gameStatus, owner: {nickName}, players, maxPlayers, areaSize, isOwner, isReady} = [...gameRoomsData.values()][0];

    const leaveGameRoomById = () => {
        leaveGameRoom(_id, history)
    }

    const removeGameRoomById = () => {
        removeGameRoom(_id, history)
    }

    const numberOfPlayersClassName = classNames(
        {["enoughForGame"]: players.length >= CONSTANTS.NUMBER_OF_PLAYERS.MIN_GAME_PLAYERS},
        {["notEnoughForGame"]: players.length < CONSTANTS.NUMBER_OF_PLAYERS.MIN_GAME_PLAYERS});
    const gameStatusClassName = classNames(
        {["expected"]: gameStatus === CONSTANTS.GAME_ROOM_STATUS.EXPECTED});

    const readyPlayers = [];
    const numberOfReadyPlayersClassName = classNames({["enoughForGame"]: readyPlayers.length >= CONSTANTS.NUMBER_OF_PLAYERS.MIN_GAME_PLAYERS}, {["notEnoughForGame"]: readyPlayers.length < CONSTANTS.NUMBER_OF_PLAYERS.MIN_GAME_PLAYERS});
    players.forEach(player=> player.isReady && readyPlayers.push(player.nickName));
    const changeReadyStatus = () => changeReady(!isReady, _id);

    return (
            <div className={styles.pageContainer}>
                <div className={styles.waitingRoomContainer}>
                    {!isOwner && <Button onClick={changeReadyStatus}>{isReady ? 'Not': ''} ready </Button>}
                    <p>
                        Game room status: <span className={gameStatusClassName}>{gameStatus}</span>
                    </p>
                    <p>
                        Number of players: <span className={numberOfPlayersClassName}>{players.length}</span><span>/{maxPlayers}</span>
                    </p>
                    <p>
                        Number of ready players: <span className={numberOfReadyPlayersClassName}>{readyPlayers.length}</span><span>/{maxPlayers}</span>
                    </p>
                    <p>
                        Ready players: <span>{readyPlayers.join(",")}</span>
                    </p>
                    <p>
                        Room owner: <span>{nickName}</span>
                    </p>
                    <p>
                        Labyrinth area size: <span>{areaSize}</span>
                    </p>
                    {!isOwner && <Button onClick={leaveGameRoomById}>Leave game room</Button>}
                    {isOwner && <Button onClick={removeGameRoomById}>Remove game room</Button>}

                    <Link className='primaryLink' to={ '/' }>Show another existing play rooms</Link>
                </div>
            </div>
    );
};

WaitingRoom.propTypes = {
    checkIsUserInSomeRoom: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    gameRoomsData: PropTypes.instanceOf(Map).isRequired,
    isFetching: PropTypes.bool.isRequired,
    leaveGameRoom: PropTypes.func.isRequired,
    removeGameRoom: PropTypes.func.isRequired,
    changeReady: PropTypes.func.isRequired,
    error: PropTypes.object
}

const mapStateToProps = state => state.gameRoomsStore;

const mapDispatchToProps = dispatch => ({
    checkIsUserInSomeRoom: () => dispatch(createCheckIsUserInSomeRoomRequestAction()),
    leaveGameRoom: (gameRoomId, history) => dispatch(createLeaveGameRoomRequestAction(gameRoomId, history)),
    removeGameRoom: (gameRoomId, history) => dispatch(createRemoveGameRoomRequestAction(gameRoomId, history)),
    changeReady: (isReady, gameRoomId) => dispatch(createChangeReadyStatusRequestAction(isReady, gameRoomId))
})

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);