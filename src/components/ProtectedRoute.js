import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const ProtectedRoute = ({component: Component,isAuthenticated, ...rest}) => (
    <Route
        {...rest}
        render={props => (
            isAuthenticated!==undefined ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/',
                    state: {from: props.location}
                }}/>
        )}
    />
)

export default ProtectedRoute
