import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {createGetRoomsRequestAction} from "../../actions/actionCreators";
import PropTypes from 'prop-types';
import GameRoomItem from "../GameRoomItem/GameRoomItem";
import styles from './GameRoomsList.module.sass';
import CONSTANTS from "../../constants";
import {InfiniteScroll} from 'react-simple-infinite-scroll';

const GameRoomsList = ({hasMore, isFetching, gameRoomsData, getGameRooms}) => {

    const getGameRoomsWithFilter = skip => {
        getGameRooms({
            limit: CONSTANTS.GET_GAME_ROOMS_LIMIT,
            skip
        })
    }
    useEffect(()=> {
        !isFetching && getGameRoomsWithFilter(0);
    }, []);

    const arrOfGameRoomsData = [...gameRoomsData.values()];

    return (
        <div className={styles.listContainer}>
            <h1>Enter existing or create own game room</h1>
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
            {arrOfGameRoomsData.length > 0 && arrOfGameRoomsData.map((gameRoomData, index)=> <GameRoomItem key={index} gameRoomData={gameRoomData}/>)
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
};

const mapStateToProps = state => state.gameRoomsStore;
const mapDispatchToProps = dispatch => ({
    getGameRooms: (filterObj)=> dispatch(createGetRoomsRequestAction(filterObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(GameRoomsList);