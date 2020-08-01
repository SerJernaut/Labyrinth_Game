import React from 'react';
import PropTypes from 'prop-types';
import styles from './GameRoomItem.module.sass'
import classNames from 'classnames';
import CONSTANTS from "../../constants";
import Button from "../Button/Button";
import {Link} from "react-router-dom";
import {Container, Row, Col} from 'react-bootstrap'


const GameRoomItem = ({gameRoomData: {_id, gameStatus, maxPlayers, areaSize, players, isCurrentRoom, owner: {nickName}}, joinGameRoom, history, disabled}) => {

    const joinGameRoomById = () => joinGameRoom(_id, history);
    const numberOfPlayersClassName = classNames({["enoughForGame"]: players.length >= CONSTANTS.NUMBER_OF_PLAYERS.MIN_GAME_PLAYERS}, {["notEnoughForGame"]: players.length < CONSTANTS.NUMBER_OF_PLAYERS.MIN_GAME_PLAYERS});
    const gameStatusClassName = classNames({["expected"]: gameStatus === CONSTANTS.GAME_ROOM_STATUS.EXPECTED});

    const col8Offset2 = {
        span: 8,
        offset: 2
    }

    const col10Offset1 = {
        span: 10,
        offset: 1
    }

    const primaryRowMg = "m-2";

    return (
        <Container fluid className={styles.itemContainer}>
            <Row className={primaryRowMg}>
                <Col xs={col10Offset1} md={col8Offset2} lg={col8Offset2} >
                    <p>Game room status: <span className={gameStatusClassName}>{gameStatus}</span>
                </p></Col>
            </Row>
            <Row className={primaryRowMg}>
                <Col>
                    <p>Number of players: <br/><span className={numberOfPlayersClassName}>{players.length}</span><span className={styles.item}>/{maxPlayers}</span>
                </p>
                </Col>
                <Col>
                    <p>
                        Room owner: <br/><span className={styles.item}>{nickName}</span>
                    </p>
                </Col>
            </Row>
            <Row className={primaryRowMg}>
                <Col xs={col8Offset2} md={col8Offset2} lg={col8Offset2}>
                <p>
                    Labyrinth area size: <span className={styles.item}>{areaSize}</span>
                </p>
                </Col>
            </Row>
            <div className="d-flex flex-md-column flex-lg-column align-items-md-center align-items-lg-center justify-content-center mb-2">
                    <div className="mb-md-2 mb-lg-2 mr-2 mr-md-0 mr-lg-0">
                        <Button className="mb-1 mb-md-0 mb-lg-0" disabled={disabled || players.length === CONSTANTS.NUMBER_OF_PLAYERS.MAX_GAME_PLAYERS} onClick={joinGameRoomById}>Join the game room</Button>
                    </div>
                {isCurrentRoom && <div >
                    <Link className='primaryLink' to={ `/waiting_room/${_id}` }><Button>
                        Return to joined room
                    </Button></Link>
                </div>}
            </div>
        </Container>
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