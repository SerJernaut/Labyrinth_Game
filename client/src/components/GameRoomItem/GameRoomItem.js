import React from 'react';
import PropTypes from 'prop-types';
import styles from './GameRoomItem.module.sass'
import classNames from 'classnames';
import CONSTANTS from "../../constants";
import Button from "../Button/Button";
import {Link} from "react-router-dom";


const GameRoomItem = ({gameRoomData: {_id, gameStatus, maxPlayers, areaSize, players, isCurrentRoom, owner: {nickName}}, joinGameRoom, history, disabled}) => {

    const joinGameRoomById = () => joinGameRoom(_id, history);
    const numberOfPlayersClassName = classNames({["enoughForGame"]: players.length >= CONSTANTS.NUMBER_OF_PLAYERS.MIN_GAME_PLAYERS}, {["notEnoughForGame"]: players.length < CONSTANTS.NUMBER_OF_PLAYERS.MIN_GAME_PLAYERS});
    const gameStatusClassName = classNames({["expected"]: gameStatus === CONSTANTS.GAME_ROOM_STATUS.EXPECTED});

    return (
        <div className={styles.itemContainer}>
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
            <Button disabled={disabled || players.length === CONSTANTS.NUMBER_OF_PLAYERS.MAX_GAME_PLAYERS} onClick={joinGameRoomById}>Join the game room</Button>
            {isCurrentRoom && <div className={styles.returnBtnContainer}>
                <Link className='primaryLink' to={ `/waiting_room/${_id}` }><Button>
                    Return to joined room
                </Button></Link>
            </div>}
        </div>
    );
};

GameRoomItem.propTypes = {
    gameRoomData: PropTypes.shape({
        gameStatus: PropTypes.string.isRequired,
        maxPlayers: PropTypes.number.isRequired,
        areaSize: PropTypes.number.isRequired,
        players: PropTypes.array.isRequired,
        owner: PropTypes.shape({nickName: PropTypes.string.isRequired})
    }),
    disabled: PropTypes.bool.isRequired,
    joinGameRoom: PropTypes.func.isRequired,
};



export default GameRoomItem;