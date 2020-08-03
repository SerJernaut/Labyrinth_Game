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
import {Col, Container, Row} from "react-bootstrap";

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

    const checkIsOwnerInSomeRoom = () => {
        return !!arrOfGameRoomsData.find(data => data.isOwner);
    }

    const disabled = checkIsCurrentGameRoom() || isFetching;

    const col8Offset2 = {
        span: 8,
        offset: 2
    };

    const col10Offset1 = {
        span: 10,
        offset: 1
    }


    return (
        <Container fluid>
            <Row>
                <Col xs={col10Offset1} sm={col10Offset1} md={col10Offset1} lg={col8Offset2}  >
                    {checkIsCurrentGameRoom() && <h1 className={styles.header}>{`Return to ${checkIsOwnerInSomeRoom()? 'created': 'joined'} room below, you can't be in two rooms simultaneously`}</h1>}
                    {!checkIsCurrentGameRoom() && <h1 className={styles.header}>Create own game room or join existing</h1>}
                        <div className="d-flex justify-content-center">
                            <Link className='primaryLink' to={ '/create_new_game_room' }><Button disabled={disabled}>
                                Create new game room
                            </Button></Link>
                        </div>
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
                                          key={index}
                                          gameRoomData={gameRoomData}
                                          joinGameRoom={joinGameRoom}
                                          history={history}
                                          disabled={disabled}/>)
                        }
                        {isFetching && 'Loading...'}
                    </InfiniteScroll>
                </Col>
            </Row>
        </Container>
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