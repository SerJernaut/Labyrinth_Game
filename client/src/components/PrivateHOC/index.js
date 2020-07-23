import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import CONSTANTS from "../../constants";

const privateHOC = (Component) => {
    const mapStateToProps = state => state.authStore;
    const HOCComponent = props => {
        useEffect(()=> {
            if (!localStorage.getItem(CONSTANTS.REFRESH_TOKEN_KEY)) {
                props.history.replace('/sign_up');
            }
        }, [])

        const {user, history, match} = props;

        return (
            <>
            {
                user ?
                         <Component history={history} match={match} {...props}/>
                        : 'LOADING...'
            }
            </>
        )
    }

    return connect(mapStateToProps)(HOCComponent);
}

export default privateHOC;