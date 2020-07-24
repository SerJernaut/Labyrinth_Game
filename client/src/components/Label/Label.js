import React      from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames';
import styles from './Label.module.sass';


const Label = ({ className, ...rest }) => {

    const classNameValue = classNames(styles.label, className);

    return (
        <label className={classNameValue} {...rest}/>
    );
};

Label.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Label;