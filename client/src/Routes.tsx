import React from 'react';
import {Switch, Route} from 'react-router-dom';

import GlobalStyles from './styles/Global/GlobalStyles';

import HomePage from './Pages/HomePage';

export function Routes() {
    return (
        <div>
            <GlobalStyles />
            <Switch>
                <Route exact path='/' component={HomePage} />
            </Switch>
        </div>
    )
}