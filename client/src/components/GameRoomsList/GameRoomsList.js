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

const GameRoomsList = ({hasMore, isFetching, gameRoomsData, getGameRooms, joinGameRoom, history, checkIsUserInSomeRoom, currentGameRoom}) => {


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

    return (
        <div className={styles.listContainer}>
            <h1>Create own game room or join existing</h1>
            <Link className='primaryLink' to={ '/create_new_game_room' }><Button>
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
            {arrOfGameRoomsData.length > 0 && arrOfGameRoomsData.map((gameRoomData, index)=> <GameRoomItem isFetching={isFetching} key={index} gameRoomData={gameRoomData} joinGameRoom={joinGameRoom} history={history} currentGameRoom={currentGameRoom}/>)
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
    currentGameRoom: PropTypes.object
};

const mapStateToProps = state => state.gameRoomsStore;
const mapDispatchToProps = dispatch => ({
    getGameRooms: (filterObj)=> dispatch(createGetRoomsRequestAction(filterObj)),
    joinGameRoom: (gameRoomId, history) => dispatch(createJoinGameRoomRequestAction({gameRoomId}, history)),
    checkIsUserInSomeRoom: () => dispatch(createCheckIsUserInSomeRoomRequestAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(GameRoomsList);