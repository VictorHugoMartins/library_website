import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewBook from './pages/NewBook';
import Contato from './pages/Contato';

export default function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/books/new" component={NewBook} />
                <Route path="/profile" component={Profile} />
                <Route path="/contato" component={Contato} />
            </Switch>
        </BrowserRouter>
    )
}