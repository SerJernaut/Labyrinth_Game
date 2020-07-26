import React from 'react';
import PropTypes from 'prop-types';
import styles from './GameRoomItem.module.sass'
import classNames from 'classnames';

const GameRoomItem = ({gameRoomData: {gameStatus, maxPlayers, areaSize, players, owner: {nickName}}}) => {

    const numberOfPlayersClassName = classNames({[styles.enoughForGame]: players.length > 1}, {[styles.notEnoughForGame]: players.length < 1});
    const gameStatusClassName = classNames({[styles.expected]: gameStatus === 'EXPECTED'});

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
    })
};

export default GameRoomItem;