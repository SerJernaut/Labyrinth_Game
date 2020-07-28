import React from 'react';
import {Link} from "react-router-dom";
import Button from "../../Button/Button";
import styles from './GameRoomsListPage.module.sass';
import GameRoomsList from "../../GameRoomsList/GameRoomsList";
import {connect} from "react-redux";
import {createClearAuthStore, createClearGameStore} from "../../../actions/actionCreators";
import PropTypes from "prop-types";

const GameRoomsListPage = ({history, clearAuthStore, clearGameStore}) => {

    const logout = () => {
        sessionStorage.clear();
        localStorage.clear();
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

const mapDispatchToProps = dispatch => ({
    clearAuthStore: ()=> dispatch(createClearAuthStore()),
    clearGameStore: ()=> dispatch(createClearGameStore())
})

export default connect(null, mapDispatchToProps)(GameRoomsListPage);
