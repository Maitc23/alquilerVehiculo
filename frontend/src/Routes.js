import React from 'react';
import Home from './core/Home';
import Search from './core/Search';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

const Routes = () => {
    return (

        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path='/search' exact component={Search} />
            </Switch>
        </BrowserRouter>
    )
}


export default Routes;