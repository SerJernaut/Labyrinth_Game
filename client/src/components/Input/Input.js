import React      from 'react';
import PropTypes  from 'prop-types';
import styles     from './Input.module.sass';
import classNames from 'classnames';

const Input = ({ field, meta, form, className, validStyles, invalidStyles, ...rest }) => {
    const inputClassName = classNames( styles.input, {
        [validStyles || styles.validValue]: meta.touched && !meta.error,
        [invalidStyles || styles.invalidValue]: meta.touched && meta.error,
    }, className );

    const copyHandler = e => {
        if (rest.type === 'password') {
            e.preventDefault();
        }
    };

    return <input onCopy={copyHandler} className={inputClassName} {...rest} {...field}/>;
};

Input.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    invalidStyles: PropTypes.string,
    validStyles: PropTypes.string,
    placeholder: PropTypes.string,
};

Input.defaultProps = {
    type: 'text'
};

export default Input;