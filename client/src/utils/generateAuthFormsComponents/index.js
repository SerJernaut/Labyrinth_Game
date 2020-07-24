import React                   from 'react';
import {Form, Formik} from 'formik';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import styles from './AuthForm.module.sass';
import authValidationSchema from "../../components/forms/validationSchemas/authSchemas";
import Button from "../../components/Button/Button";
import {createAuthRequestAction} from "../../actions/actionCreators";
import FIELDS from '../../components/forms/formFields/index'
import {renderFields} from "../renderFields";

const generateAuthForms = (isRegistration, buttonText) => {
    const Component = ({auth}) => {

        const submitHandler = (values) => {
            auth(values, isRegistration)
        }

        return (
            <div className={styles.formContainer}>
                <Formik
                    initialValues={{
                        nickName: '',
                        password: ''
                    }}
                    onSubmit = { values => {
                    submitHandler(values)
                }}
                    validationSchema={authValidationSchema}>
                    {formik => (
                        (
                            <Form onSubmit={formik.handleSubmit}>
                                {renderFields(FIELDS.authFields)}
                                <Button disabled={formik.isSubmitting} type='submit'>{buttonText}</Button>
                            </Form>
                        )
                    )
                    }
                </Formik>
            </div>
        )
    }

    Component.propTypes = {
        auth: PropTypes.func.isRequired
    };

    const mapDispatchToProps = dispatch => ({
        auth: (values, isRegistration) => dispatch(createAuthRequestAction(values, isRegistration))
    })

    return connect(null, mapDispatchToProps)(Component)
}

export default generateAuthForms;