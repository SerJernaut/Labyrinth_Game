import React                   from 'react';
import {Form, Field, Formik} from 'formik';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import styles from './AuthForm.module.sass';
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import StyledErrorMessage from "../../components/StyledErrorMessage/StyledErrorMessage";
import authValidationSchema from "../../components/forms/validationSchemas/authSchemas";
import Button from "../../components/Button/Button";
import {createAuthRequestAction} from "../../actions/actionCreators";
import FIELDS from '../../components/forms/formFields/index'

const generateAuthForms = (isRegistration, buttonText) => {
    const Component = ({values, isSubmitting, auth}) => {
        const renderFields = () => {
            return FIELDS.authFields.map( ({ name, ...rest }) => (
                <Field key={name} name={name}>
                    {
                        fieldProps => (
                            <Label className={styles.label}>
                                <Input {...rest} {...fieldProps}/>
                                {fieldProps.meta.touched && fieldProps.meta.error && <StyledErrorMessage className={styles.errorWrapper} name={fieldProps.field.name}/>}
                            </Label>
                        )
                    }
                </Field>) );
        }
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
                                {renderFields()}
                                <Button disabled={isSubmitting} type='submit'>{buttonText}</Button>
                            </Form>
                        )
                    )
                    }
                </Formik>
            </div>
        )
    }

    Component.propTypes = {
        values: PropTypes.object.isRequired,
        isSubmitting: PropTypes.bool.isRequired,
        auth: PropTypes.func.isRequired
    };

    const mapDispatchToProps = dispatch => ({
        auth: (values, isRegistration) => dispatch(createAuthRequestAction(values, isRegistration))
    })

    return connect(null, mapDispatchToProps)(Component)
}

export default generateAuthForms;