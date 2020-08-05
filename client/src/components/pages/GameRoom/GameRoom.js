import React, {useEffect, useRef} from 'react';
import {connect} from "react-redux";
import {
    createChangeReadyStatusRequestAction,
    createCheckIsUserInSomeRoomRequestAction,
    createLeaveGameRoomRequestAction,
    createRemoveGameRoomRequestAction, createSetBoardCellsRequestAction, createSetWinnerRequestAction,
    createStartGameRequestAction,
} from "../../../actions/actionCreators";
import PropTypes from 'prop-types';
import styles from "./GameRoom.module.sass";
import classNames from "classnames";
import CONSTANTS from "../../../constants";
import Button from "../../Button/Button";
import {Link} from "react-router-dom";
import {gameController} from "../../../api/ws/initSocket";
import {Col, Container, Row} from "react-bootstrap";
import {toast} from "react-toastify";
import _ from 'lodash';
import KeyboardEventHandler from 'react-keyboard-event-handler';

const {NUMBER_OF_PLAYERS, GAME_ROOM_STATUS, MOVE_DIRECTION, HANDLE_KEYS} = CONSTANTS;

const HANDLE_KEYS_ARR = Object.values(HANDLE_KEYS).map(value=> value);


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


const GameRoom = ({history, match, gameRoomsStore: {gameRoomsData, isFetching, error}, authStore: {user}, checkIsUserInSomeRoom, leaveGameRoom, removeGameRoom, changeReady, startGame, setBoardCells, setWinner}) => {

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
        if((error && error.status === 404) || (prevState && prevState.gameRoomsData.size > 0 && gameRoomsData && gameRoomsData.size === 0)) {
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

    const {_id, gameStatus, owner, players, maxPlayers, areaSize, isOwner, isReady, boardCells, whoseMove, winner} = [...gameRoomsData.values()][0];

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

    const startGameById = () => {
        startGame(_id, generateBoardCellsInfoForStartGame());
    }

    const numberOfPlayersClassName = classNames(
        {["enoughForGame"]: players.length >= NUMBER_OF_PLAYERS.MIN_GAME_PLAYERS},
        {["notEnoughForGame"]: players.length < NUMBER_OF_PLAYERS.MIN_GAME_PLAYERS});
    const gameStatusClassName = classNames(
        {["expected"]: gameStatus === GAME_ROOM_STATUS.EXPECTED});

    const readyPlayers = [];
    const ownerIndex = players.findIndex(player=> player.nickName === owner.nickName);
    if(players && typeof ownerIndex === 'number' && players[ownerIndex]) {
        players[ownerIndex].isReady = true;
    }
    players.forEach(player=> player.isReady && readyPlayers.push(player.nickName));

    const numberOfReadyPlayersClassName = classNames({["enoughForGame"]: readyPlayers.length >= NUMBER_OF_PLAYERS.MIN_GAME_PLAYERS && readyPlayers.length === players.length}, {["notEnoughForGame"]: readyPlayers.length < NUMBER_OF_PLAYERS.MIN_GAME_PLAYERS || readyPlayers.length < players.length});

    const changeReadyStatus = () => changeReady(!isReady, _id);

    const playersNickNamesArr = players.map(player=> player.nickName);

    const boardCellsPreparedRows = chunkArray(boardCells, Math.sqrt(areaSize));


    const boardCellsRows = boardCellsPreparedRows.map((boardCellsRow, index)=> (
      (
                <Row key={index}>
                    {boardCellsRow.map((boardCell, index)=> (
                        <Col key={index + boardCell.cellIndex} className="p-0">
                            <div className={classNames(styles.boardCellContainer, {[styles.explored]: boardCell.usersWhoExplored.find(id=> id === user._id)})}>
                                <div className={classNames(styles.plug, "d-flex justify-content-center align-items-center")}>
                                    {boardCell.standingUsers.find(id => id === user._id) && <div className={styles.stayingCircle}>
                                    </div>}
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>

        )
    ))

    const generateNotAllowedIndexes = moveDirection => {
        const notAllowedToTurnCellsIndexes = [];
        switch (moveDirection) {
            case MOVE_DIRECTION.LEFT: {
                for(let i = 0; i < areaSize; i+=Math.sqrt(areaSize)) {
                    notAllowedToTurnCellsIndexes.push(i);
                }
                break;
            }
            case MOVE_DIRECTION.RIGHT: {
                for(let i = Math.sqrt(areaSize) - 1; i < areaSize; i+= areaSize) {
                    notAllowedToTurnCellsIndexes.push(i);
                }
                break;
            }
            case MOVE_DIRECTION.TOP: {
                for(let i = 0; i < Math.sqrt(areaSize); i++) {
                    notAllowedToTurnCellsIndexes.push(i);
                }
                break;
            }
            case MOVE_DIRECTION.BOTTOM: {
                for(let i = areaSize - 1; i > areaSize - Math.sqrt(areaSize) - 1; i--) {
                    notAllowedToTurnCellsIndexes.push(i);
                }
                break;
            }
        }
        return notAllowedToTurnCellsIndexes;
    }

    const setNewBoardCellsValues = (boardCellsClone, newCurrentBoardCellIndex) => {
        boardCellsClone[newCurrentBoardCellIndex].standingUsers.push(user._id);
        boardCellsClone[newCurrentBoardCellIndex].usersWhoExplored.push(user._id);
        if (boardCellsClone[newCurrentBoardCellIndex].hasTreasure) {
            setWinner(_id, user);
            toast.success( `It's a treasure! You are winner!`)
        }
    }

    const generateNewCurrentBoardCellIndexAndSetNewData = (moveDirection, boardCellsClone, currentBoardCellIndex) => {
        boardCellsClone[currentBoardCellIndex].standingUsers = boardCellsClone[currentBoardCellIndex].standingUsers.filter(u=> u !== user._id);
        switch (moveDirection) {
            case MOVE_DIRECTION.LEFT: {
                const newCurrentBoardCellIndex = currentBoardCellIndex - 1;
                setNewBoardCellsValues(boardCellsClone, newCurrentBoardCellIndex);
                break;
            }
            case MOVE_DIRECTION.RIGHT: {
                const newCurrentBoardCellIndex = currentBoardCellIndex + 1;
                setNewBoardCellsValues(boardCellsClone, newCurrentBoardCellIndex);
                break;
            }
            case MOVE_DIRECTION.TOP: {
                const newCurrentBoardCellIndex = currentBoardCellIndex - Math.sqrt(areaSize);
                setNewBoardCellsValues(boardCellsClone, newCurrentBoardCellIndex);
                break;
            }
            case MOVE_DIRECTION.BOTTOM: {
                const newCurrentBoardCellIndex = currentBoardCellIndex + Math.sqrt(areaSize);
                setNewBoardCellsValues(boardCellsClone, newCurrentBoardCellIndex);
                break;
            }
        }
        return boardCellsClone;
    }

    const moveInTheSpecifiedDirection = moveDirection => {
        const boardCellsClone = _.cloneDeep(boardCells);
        const currentBoardCellIndex = boardCellsClone.findIndex(boardCell=> boardCell.standingUsers.find(u=> u === user._id))
        const notAllowedToTurnCellsIndexes = generateNotAllowedIndexes(moveDirection);
        const currentBoardCellIndexAmongArrOfIndexes = notAllowedToTurnCellsIndexes.find(i=> i === currentBoardCellIndex)
        if (currentBoardCellIndexAmongArrOfIndexes || currentBoardCellIndexAmongArrOfIndexes === 0) {
            toast.error(`You can not move ${moveDirection.toLowerCase()}, no way here`)
        }
        else {
            const whoseMoveClone = _.cloneDeep(whoseMove);
            const playersClone = _.cloneDeep(players);
            const oldCurrentMovePlayerIndex = playersClone.findIndex(player=> player._id == whoseMoveClone._id);
            const currentMovePlayerIndex =  oldCurrentMovePlayerIndex + 1;
            let newWhoseMove;
            if (currentMovePlayerIndex <= playersClone.length - 1) {
                newWhoseMove = playersClone[currentMovePlayerIndex];
            }
            else {
                newWhoseMove = playersClone[0];
            }
            setBoardCells(_id, generateNewCurrentBoardCellIndexAndSetNewData(moveDirection, boardCellsClone, currentBoardCellIndex), newWhoseMove)
        }
    }

    const matchKeyWithMoveDirection = key => {
        switch (key) {
            case HANDLE_KEYS.LEFT: {
                return MOVE_DIRECTION.LEFT;
            }
            case HANDLE_KEYS.RIGHT: {
                return MOVE_DIRECTION.RIGHT;
            }
            case HANDLE_KEYS.UP: {
                return MOVE_DIRECTION.TOP;
            }
            case HANDLE_KEYS.DOWN: {
                return MOVE_DIRECTION.BOTTOM
            }
        }
    }

    return (
        <>
            {gameStatus === GAME_ROOM_STATUS.EXPECTED && <div className={styles.pageContainer}>
                <div className={styles.waitingRoomContainer}>
                    {isOwner && players.length >= NUMBER_OF_PLAYERS.MIN_GAME_PLAYERS && players.every(player=> player.isReady) &&
                        <Button onClick={startGameById}>Start game</Button>}
                    {isOwner && players.length >= NUMBER_OF_PLAYERS.MIN_GAME_PLAYERS && !players.every(player=> player.isReady) &&
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
            {gameStatus !== GAME_ROOM_STATUS.EXPECTED &&
                <>
                <Container fluid className='w-50'>
                    {boardCellsRows}
                </Container>
                {gameStatus === GAME_ROOM_STATUS.PLAYING && whoseMove && whoseMove._id === user._id && <h1 className="h1 mb-0">Take a step, all players waiting until you take a step</h1>}
                {gameStatus === GAME_ROOM_STATUS.PLAYING && whoseMove && whoseMove._id === user._id && HANDLE_KEYS_ARR.map(key=> (<KeyboardEventHandler handleKeys={[key]}
                    onKeyEvent={(key, e)=> moveInTheSpecifiedDirection(matchKeyWithMoveDirection(key))}
                    />))}
                {gameStatus === GAME_ROOM_STATUS.PLAYING && whoseMove._id !== user._id && <h1 className="h1 mb-0">Wait until {whoseMove.nickName} take a step</h1>}
                {gameStatus === GAME_ROOM_STATUS.ENDED && winner && <h1 className="h1 mb-0">{winner.nickName === user.nickName ? 'You' : winner.nickName} won the game!</h1>}
                    </>
            }

        </>
    );
};

GameRoom.propTypes = {
    checkIsUserInSomeRoom: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    gameRoomsData: PropTypes.instanceOf(Map),
    isFetching: PropTypes.bool.isRequired,
    leaveGameRoom: PropTypes.func.isRequired,
    removeGameRoom: PropTypes.func.isRequired,
    changeReady: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired,
    setBoardCells: PropTypes.func.isRequired,
    setWinner: PropTypes.func.isRequired,
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
    startGame: (gameRoomId, boardCells) => dispatch(createStartGameRequestAction(gameRoomId, boardCells)),
    setBoardCells: (gameRoomId, boardCells, whoseMove) => dispatch(createSetBoardCellsRequestAction(gameRoomId, boardCells, whoseMove)),
    setWinner: (gameRoomId, winner) => dispatch(createSetWinnerRequestAction(gameRoomId, winner))
})

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom);