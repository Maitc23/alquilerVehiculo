import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

//View Components
import Home from './core/Home';
import Login from './core/auth/Login';
import Register from './core/auth/Register';
import Profile from './core/users/Profile'; 
import NewCategory from './core/vehicles/category/NewCategory'
import NewVehicle from './core/vehicles/NewVehicle'
import Vehicle from './core/vehicles/Vehicle'

const Routes = () => {
    return (

        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <Route path='/profile' exact component = {Profile} />
                <Route path= '/newCategory' exact component = {NewCategory}/>
                <Route path= '/newVehicle' exact component = {NewVehicle}/>
                <Route path= '/vehicle/:_id' exact component = {Vehicle} />
            </Switch>
        </BrowserRouter>
    )
}


export default Routes;