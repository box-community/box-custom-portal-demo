// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest }) {
  // Add your own authentication on the below line.
  const shouldLogin = sessionStorage.getItem('token')==null;
console.log(rest);
  return (
    <Route {...rest} render={props => {
        if (shouldLogin) {
            // not logged in so redirect to login page with the return url
            console.log('2'+shouldLogin);
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
        else {
            console.log('3'+shouldLogin);
        // authorized so return component
            return <Component {...props} />
        }
    }} />
  );
}


export default PrivateRoute