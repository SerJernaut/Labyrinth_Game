import React, {useEffect, useRef} from 'react';
import {connect} from "react-redux";
import {
    createChangeReadyStatusRequestAction,
    createCheckIsUserInSomeRoomRequestAction, createCheckOnWhatBoardCellStayingUserRequestAction,
    createLeaveGameRoomRequestAction,
    createRemoveGameRoomRequestAction, createSetBoardCellsRequestAction,
} from "../../../actions/actionCreators";
import PropTypes from 'prop-types';
import styles from "./GameRoom.module.sass";
import classNames from "classnames";
import CONSTANTS from "../../../constants";
import Button from "../../Button/Button";
import {Link} from "react-router-dom";
import {gameController} from "../../../api/ws/initSocket";
import {Col, Container, Row} from "react-bootstrap";

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const chunkArray = (arr, chunk_size) =>{
    let index;
    const arrayLength = arr.length;
    const tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
        const chunk = arr.slice(index, index+chunk_size);
        tempArray.push(chunk);
    }

    return tempArray;
}


const GameRoom = ({history, match, error, gameRoomsStore: {gameRoomsData, isFetching}, authStore: {user: {_id: userId}}, checkIsUserInSomeRoom, leaveGameRoom, removeGameRoom, changeReady, setRandomBoardCells}) => {

    const prevState = usePrevious({gameRoomsData});

    useEffect(()=> {
        gameRoomsData
        && gameRoomsData.size === 0
        && !isFetching
        && checkIsUserInSomeRoom();
    }, []);

    useEffect(()=> {
        if(gameRoomsData
            && gameRoomsData.size > 0
            && [...gameRoomsData.values()][0]._id !== +match.params.id) {
                [...gameRoomsData.values()].find(gameRoomData=> gameRoomData.isCurrentRoom)
                ?
                history.replace(`/game_room/${[...gameRoomsData.values()].find(gameRoomData=> gameRoomData.isCurrentRoom)._id}`)
                :
                history.replace('/')
        }
    });

    useEffect(()=> {
        if((error && error.status === 404) || prevState && prevState.gameRoomsData.size > 0 && gameRoomsData && gameRoomsData.size === 0) {
            history.replace('/')
        }
    })

    useEffect(()=> {
        gameRoomsData
        && gameRoomsData.size > 0
        && gameController.subscribeGameRoom([...gameRoomsData.values()][0]._id);
        return () => gameRoomsData && gameRoomsData.size > 0 && gameController.unsubscribeGameRoom([...gameRoomsData.values()][0]._id);
    })

    if (gameRoomsData.size === 0) {return null}

    const {_id, gameStatus, owner, players, maxPlayers, areaSize, isOwner, isReady, boardCells} = [...gameRoomsData.values()][0];

    const leaveGameRoomById = () => {
        leaveGameRoom(_id, history)
    }

    const removeGameRoomById = () => {
        removeGameRoom(_id, history)
    }


    const generateBoardCellsInfoForStartGame = () => {
        const boardCells = [];
        for (let i = 0; i < areaSize; i++) {
            const cellIndex = i;
            boardCells.push({cellIndex})
        }
        const treasureBoardCellIndex = Math.floor(Math.random() * areaSize)
        boardCells[treasureBoardCellIndex].hasTreasure = true;
        boardCells.forEach(boardCell=> {
            if (!boardCell.hasTreasure) {
                boardCell.hasTreasure = false
            }
            boardCell.standingUsers = [];
            boardCell.usersWhoExplored = [];
        });

        players.forEach(player=> {
            const standingBoardCellIndex = Math.floor(Math.random() * areaSize);
            while (true) {
                if (standingBoardCellIndex !== treasureBoardCellIndex) {
                    boardCells[standingBoardCellIndex].standingUsers.push(player._id);
                    boardCells[standingBoardCellIndex].usersWhoExplored.push(player._id);
                    break;
                }
            }

        })

        return boardCells;
    }

    const startGame = () => {
        setRandomBoardCells(_id, generateBoardCellsInfoForStartGame());
    }

    const numberOfPlayersClassName = classNames(
        {["enoughForGame"]: players.length >= CONSTANTS.NUMBER_OF_PLAYERS.MIN_GAME_PLAYERS},
        {["notEnoughForGame"]: players.length < CONSTANTS.NUMBER_OF_PLAYERS.MIN_GAME_PLAYERS});
    const gameStatusClassName = classNames(
        {["expected"]: gameStatus === CONSTANTS.GAME_ROOM_STATUS.EXPECTED});

    const readyPlayers = [];
    const ownerIndex = players.findIndex(player=> player.nickName === owner.nickName);
    if(players && typeof ownerIndex === 'number' && players[ownerIndex]) {
        players[ownerIndex].isReady = true;
    }
    players.forEach(player=> player.isReady && readyPlayers.push(player.nickName));

    const numberOfReadyPlayersClassName = classNames({["enoughForGame"]: readyPlayers.length >= CONSTANTS.NUMBER_OF_PLAYERS.MIN_GAME_PLAYERS && readyPlayers.length === players.length}, {["notEnoughForGame"]: readyPlayers.length < CONSTANTS.NUMBER_OF_PLAYERS.MIN_GAME_PLAYERS || readyPlayers.length < players.length});

    const changeReadyStatus = () => changeReady(!isReady, _id);

    const playersNickNamesArr = players.map(player=> player.nickName);

    const boardCellsPreparedRows = chunkArray(boardCells, Math.sqrt(areaSize));

    const boardCellsRows = [];

    boardCellsPreparedRows.forEach((boardCellsRow, index)=> (
        boardCellsRows.push(
                <Row key={index}>
                    {boardCellsRow.map((boardCell, index)=> (
                        <Col key={index + boardCell.cellIndex} className="p-0">
                            <div className={classNames(styles.boardCellContainer ,{["border border-secondary"]: boardCell.usersWhoExplored.find(id=> id === userId)})}>
                                <div className={classNames(styles.plug, "d-flex justify-content-center align-items-center")}>
                                    {boardCell.standingUsers.find(id => id === userId) && <div className={styles.stayingCircle}>
                                    </div>}
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            )
        )
    )

    return (
        <>
            {gameStatus === CONSTANTS.GAME_ROOM_STATUS.EXPECTED && <div className={styles.pageContainer}>
                <div className={styles.waitingRoomContainer}>
                    {isOwner && players.length >= CONSTANTS.NUMBER_OF_PLAYERS.MIN_GAME_PLAYERS && players.every(player=> player.isReady) &&
                        <Button onClick={startGame}>Start game</Button>}
                    {isOwner && players.length >= CONSTANTS.NUMBER_OF_PLAYERS.MIN_GAME_PLAYERS && !players.every(player=> player.isReady) &&
                    <p className={styles.msgForOwner}>Wait until all players press ready</p>}
                    {isOwner && players.length === 1 && <p className={styles.msgForOwner}>You can not start the game solo, wait until other players join the game</p>}
                    {!isOwner && <Button onClick={changeReadyStatus}>I'm {isReady ? 'not': ''} ready to play</Button>}
                    <p>
                        Game room status: <span className={gameStatusClassName}>{gameStatus}</span>
                    </p>
                    <p>
                        Number of players: <span className={numberOfPlayersClassName}>{players.length}</span><span>/{maxPlayers}</span>
                    </p>
                    <p>
                        Room participants/further players: <span>{playersNickNamesArr.join(', ')}</span>
                    </p>
                    <p>
                        Number of ready players: <span className={numberOfReadyPlayersClassName}>{readyPlayers.length}</span><span>/{players.length}</span>
                    </p>
                    <p>
                        Ready players: <span>{readyPlayers.join(", ")}</span>
                    </p>
                    <p>
                        Room owner: <span>{owner.nickName}</span>
                    </p>
                    <p>
                        Labyrinth area size: <span>{areaSize}</span>
                    </p>
                    {!isOwner && <Button onClick={leaveGameRoomById}>Leave game room</Button>}
                    {isOwner && <Button onClick={removeGameRoomById}>Remove game room</Button>}

                    <Link className='primaryLink' to={ '/' }>Show another existing play rooms</Link>
                </div>
            </div>}
            {gameStatus === CONSTANTS.GAME_ROOM_STATUS.PLAYING &&
                <Container fluid className='w-50'>
                    {boardCellsRows}
                </Container>
            }
        </>
    );
};

GameRoom.propTypes = {
    checkIsUserInSomeRoom: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    gameRoomsData: PropTypes.instanceOf(Map).isRequired,
    isFetching: PropTypes.bool.isRequired,
    leaveGameRoom: PropTypes.func.isRequired,
    removeGameRoom: PropTypes.func.isRequired,
    changeReady: PropTypes.func.isRequired,
    setRandomBoardCells: PropTypes.func.isRequired,
    checkOnWhatBoardCellStayingUser: PropTypes.func.isRequired,
    error: PropTypes.object
}

const mapStateToProps = state => ({gameRoomsStore: state.gameRoomsStore,
    authStore: state.authStore
    }
);

const mapDispatchToProps = dispatch => ({
    checkIsUserInSomeRoom: () => dispatch(createCheckIsUserInSomeRoomRequestAction()),
    leaveGameRoom: (gameRoomId, history) => dispatch(createLeaveGameRoomRequestAction(gameRoomId, history)),
    removeGameRoom: (gameRoomId, history) => dispatch(createRemoveGameRoomRequestAction(gameRoomId, history)),
    changeReady: (isReady, gameRoomId) => dispatch(createChangeReadyStatusRequestAction(isReady, gameRoomId)),
    setRandomBoardCells: (gameRoomId, boardCells) => dispatch(createSetBoardCellsRequestAction(gameRoomId, boardCells)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom);