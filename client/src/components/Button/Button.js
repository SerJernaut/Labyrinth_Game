import React      from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames';
import styles     from './Button.module.sass';

const Button = ({ className, disabled, ...rest }) => {

    const classNameValue = classNames( styles.button, className);

    return (
        <button className={classNameValue} disabled={disabled} {...rest}/>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
};



export default Button;