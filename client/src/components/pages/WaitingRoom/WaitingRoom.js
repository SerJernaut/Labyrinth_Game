import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {createCheckIsUserInSomeRoomRequestAction} from "../../../actions/actionCreators";
import PropTypes from 'prop-types';
import styles from "./WaitingRoom.module.sass";
import Button from "../../Button/Button";
import {Link} from "react-router-dom";
import classNames from "classnames";
import CONSTANTS from "../../../constants";

const WaitingRoom = ({history, match, currentGameRoom, isFetching, checkIsUserInSomeRoom}) => {

    useEffect(()=> {
        !currentGameRoom && !isFetching && checkIsUserInSomeRoom();
    }, []);

    useEffect(()=> {
        if(currentGameRoom && currentGameRoom._id !== +match.params.id) {
            history.replace('/')}
    })

    if (!currentGameRoom) {return null}

    const {gameStatus, owner: {nickName}, players, maxPlayers, areaSize} = currentGameRoom;
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

                </div>
            </div>
    );
};

WaitingRoom.propTypes = {
    getOneGameRoom: PropTypes.func.isRequired,
    checkIsUserInSomeRoom: PropTypes.func.isRequired
}

const mapStateToProps = state => state.gameRoomsStore;

const mapDispatchToProps = dispatch => ({
    checkIsUserInSomeRoom: () => dispatch(createCheckIsUserInSomeRoomRequestAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);