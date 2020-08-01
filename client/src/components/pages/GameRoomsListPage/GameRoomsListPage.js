import React from 'react';
import Button from "../../Button/Button";
import styles from './GameRoomsListPage.module.sass';
import GameRoomsList from "../../GameRoomsList/GameRoomsList";
import {connect} from "react-redux";
import {createClearAuthStore, createClearGameStore} from "../../../actions/actionCreators";
import PropTypes from "prop-types";
import {appController} from "../../../api/ws/initSocket";

const GameRoomsListPage = ({history, user: {_id}, clearAuthStore, clearGameStore}) => {

    const logout = () => {
        sessionStorage.clear();
        localStorage.clear();
        appController.unsubscribe(_id)
        clearAuthStore();
        clearGameStore();
        history.replace('/login')
    }

    return (
        <>
            <div className={styles.pageContainer}>
                <div className={styles.btnContainer}>
                    <Button onClick={logout}>
                        Logout
                    </Button>
                </div>
                <div className={styles.mainContainer}>
                    <GameRoomsList history={history}/>
                </div>
            </div>
        </>
    );
};

GameRoomsListPage.propTypes = {
    clearAuthStore: PropTypes.func.isRequired,
    clearGameStore: PropTypes.func.isRequired
};

const mapStateToProps = state => state.authStore;

const mapDispatchToProps = dispatch => ({
    clearAuthStore: ()=> dispatch(createClearAuthStore()),
    clearGameStore: ()=> dispatch(createClearGameStore())
})

export default connect(mapStateToProps, mapDispatchToProps)(GameRoomsListPage);
