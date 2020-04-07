import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Home from './views/Home';
import Users from './views/Users';


function Logout(){
    sessionStorage.removeItem('blogToken');
    return <Redirect to="/login" />
}

function Routes(){
    return (
        <>
            <Route exact path="/" component={ Home } />
            <Route exact path="/users" component={ Users } />
        </>
    );
}

export default Routes;