import React, {useEffect} from 'react';
import {connect} from 'react-redux';


const ForNotAuthorizedHOC = (Component) => {

    const mapStateToProps = state => state.authStore;

    const Hoc = ({user, history, match, isFetching}) => {

        useEffect(() => {
            if (user) {
                history.replace('/');
            }
        });

        return (
            <>
                {
                    !user && !isFetching
                        ? <Component history={history} match={match}/>
                        : 'LOADING...'
                }
            </>
        );

    };

    return connect(mapStateToProps)(Hoc);
};

export default ForNotAuthorizedHOC;