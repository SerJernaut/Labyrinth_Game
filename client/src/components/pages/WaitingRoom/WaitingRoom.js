import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {
    createCheckIsUserInSomeRoomRequestAction, createLeaveGameRoomRequestAction,
} from "../../../actions/actionCreators";
import PropTypes from 'prop-types';
import styles from "./WaitingRoom.module.sass";
import classNames from "classnames";
import CONSTANTS from "../../../constants";
import Button from "../../Button/Button";

const WaitingRoom = ({history, match, gameRoomsData, isFetching, checkIsUserInSomeRoom, leaveGameRoom}) => {

    useEffect(()=> {
        gameRoomsData && gameRoomsData.size === 0 && !isFetching && checkIsUserInSomeRoom();
    }, []);

    useEffect(()=> {
        if(gameRoomsData && gameRoomsData.size === 0 || (gameRoomsData && gameRoomsData.size > 0 && gameRoomsData.get(+match.params.id)._id !== +match.params.id)) {
            history.replace('/')}
    });

    if (gameRoomsData.size === 0) {return null}

    const {_id, gameStatus, owner: {nickName}, players, maxPlayers, areaSize} = gameRoomsData.get(+match.params.id);

    const leaveGameRoomById = () => {
        leaveGameRoom(_id, history)
    }

    const numberOfPlayersClassName = classNames({["enoughForGame"]: players.length >= CONSTANTS.NUMBER_OF_PLAYERS.MIN_GAME_PLAYERS}, {["notEnoughForGame"]: players.length < CONSTANTS.NUMBER_OF_PLAYERS.MIN_GAME_PLAYERS});
    const gameStatusClassName = classNames({["expected"]: gameStatus === CONSTANTS.GAME_ROOM_STATUS.EXPECTED});

    return (
        !isFetching &&
            <div className={styles.pageContainer}>
                <div className={styles.waitingRoomContainer}>
                    <p>
                        Game room status: <span className={gameStatusClassName}>{gameStatus}</span>
                    </p>
                    <p>
                        Number of players: <span className={numberOfPlayersClassName}>{players.length}</span><span>/{maxPlayers}</span>
                    </p>
                    <p>
                        Room owner: <span>{nickName}</span>
                    </p>
                    <p>
                        Labyrinth area size: <span>{areaSize}</span>
                    </p>
                    <Button onClick={leaveGameRoomById}>Leave game room</Button>
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
    leaveGameRoom: PropTypes.func.isRequired
}

const mapStateToProps = state => state.gameRoomsStore;

const mapDispatchToProps = dispatch => ({
    checkIsUserInSomeRoom: () => dispatch(createCheckIsUserInSomeRoomRequestAction()),
    leaveGameRoom: (gameRoomId, history) => dispatch(createLeaveGameRoomRequestAction(gameRoomId, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);