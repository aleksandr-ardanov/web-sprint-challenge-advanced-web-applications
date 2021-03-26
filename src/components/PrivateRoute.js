import React from 'react'
import {Redirect, Route} from 'react-router';



const PrivateRoute = ({component: Component, ...rest}) => {
    return(
        <Route {...rest} render = {props => {
            if (localStorage.getItem('token')) {
                return <Component {...props} />;  
            } else {
                return <Redirect to="/"/>;   //if token does not exist it will redirect us to  the login page. we don't care if token's value is wrong(or created manually to avoid this simple checker), because even if it will be redirected to the page we won't get any data with wrong token.
            }  
        }}/>
    )
}

export default PrivateRoute;




//Task List:
//1. Build a PrivateRoute component that redirects if user is not logged in