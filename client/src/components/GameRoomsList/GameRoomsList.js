import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {
    createCheckIsUserInSomeRoomRequestAction,
    createGetRoomsRequestAction,
    createJoinGameRoomRequestAction
} from "../../actions/actionCreators";
import PropTypes from 'prop-types';
import GameRoomItem from "../GameRoomItem/GameRoomItem";
import styles from './GameRoomsList.module.sass';
import CONSTANTS from "../../constants";
import {InfiniteScroll} from 'react-simple-infinite-scroll';
import {Link} from "react-router-dom";
import Button from "../Button/Button";

const GameRoomsList = ({hasMore, isFetching, gameRoomsData, getGameRooms, joinGameRoom, history, checkIsUserInSomeRoom}) => {


    const getGameRoomsWithFilter = skip => {
        getGameRooms({
            limit: CONSTANTS.GET_GAME_ROOMS_LIMIT,
            skip
        })
    }
    useEffect(()=> {
        !isFetching && getGameRoomsWithFilter(0);
        !isFetching && checkIsUserInSomeRoom();
    }, []);

    const arrOfGameRoomsData = [...gameRoomsData.values()];

    const checkIsCurrentGameRoom = () => {
        return !!arrOfGameRoomsData.find(data => data.isCurrentRoom);
    }

    const disabledConditionsForCreateAndJoinBtns = checkIsCurrentGameRoom() || isFetching;

    return (
        <div className={styles.listContainer}>
            <h1>Create own game room or join existing</h1>
            <Link className='primaryLink' to={ '/create_new_game_room' }><Button disabled={disabledConditionsForCreateAndJoinBtns}>
                Create new game room
            </Button></Link>
            <InfiniteScroll
                throttle={100}
                threshold={300}
                isLoading={isFetching}
                hasMore={hasMore}
                onLoadMore={() => {
                    getGameRoomsWithFilter(arrOfGameRoomsData.length)
                }
                }
            >
            {arrOfGameRoomsData.length > 0 &&
             arrOfGameRoomsData.map((gameRoomData, index)=>
                 <GameRoomItem isFetching={isFetching}
                               key={index} g
                               ameRoomData={gameRoomData}
                               joinGameRoom={joinGameRoom}
                               history={history}
                               disabled={disabledConditionsForCreateAndJoinBtns}/>)
            }
                {isFetching && 'Loading...'}
            </InfiniteScroll>
        </div>
    );
};

GameRoomsList.propTypes = {
    getGameRooms: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    gameRoomsData: PropTypes.instanceOf(Map).isRequired,
    joinGameRoom: PropTypes.func.isRequired,
    checkIsUserInSomeRoom: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.gameRoomsStore;
const mapDispatchToProps = dispatch => ({
    getGameRooms: (filterObj)=> dispatch(createGetRoomsRequestAction(filterObj)),
    joinGameRoom: (gameRoomId, history) => dispatch(createJoinGameRoomRequestAction({gameRoomId}, history)),
    checkIsUserInSomeRoom: () => dispatch(createCheckIsUserInSomeRoomRequestAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(GameRoomsList);