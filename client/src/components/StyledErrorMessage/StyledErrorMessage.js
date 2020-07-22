import React            from 'react';
import PropTypes        from 'prop-types';
import { ErrorMessage } from 'formik';
import classNames       from 'classnames';
import styles           from './StyledErrorMessage.module.sass';

const StyledErrorMessage = ({ name, className, ...rest }) => {

    const classNameValue = classNames( styles.error, className );

    return (
        <ErrorMessage name={name}>
            {
                msg => <span {...rest} className={classNameValue}>{msg}</span>
            }
        </ErrorMessage>
    );
};

StyledErrorMessage.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    styles: PropTypes.object
};

export default StyledErrorMessage;