import React, {useEffect} from 'react';
import {Form, Formik} from 'formik';
import {createGameRoomCreationRequestAction} from "../../../actions/actionCreators";
import Button from "../../Button/Button";
import gameRoomCreationSchema from "../validationSchemas/gameRoomCreationSchema";
import {renderFields} from "../../../utils/renderFields";
import FIELDS from "../formFields";
import styles from './GameRoomCreationForm.module.sass';
import PropTypes from "prop-types";
import {connect} from "react-redux";


const GameRoomCreationForm = ({createGameRoom, history, isFetching}) => {


    return (
        <div className={styles.formContainer}>
            <Formik
                initialValues={{
                    maxPlayers: 5,
                    areaSize: 9
                }}
                onSubmit = { values => {
                    createGameRoom(values, history)
                }}
                validationSchema={gameRoomCreationSchema}>
                {formik => (
                    (
                        <Form onSubmit={formik.handleSubmit}>
                            {renderFields(FIELDS.gameCreationFields)}
                            <Button disabled={isFetching} type='submit'>create new game room</Button>
                        </Form>
                    )
                )
                }
            </Formik>
        </div>
    )
}

GameRoomCreationForm.propTypes = {
    createGameRoom: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
};


const mapDispatchToProps = dispatch => ({
    createGameRoom: (values, history) => dispatch(createGameRoomCreationRequestAction(values, history))
})

export default connect(null, mapDispatchToProps)(GameRoomCreationForm)

