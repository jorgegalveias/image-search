import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Store from './state/Store';

import HomePage from './components/Pages/HomePage';

//Add FontAwesome Icons
library.add(fas)

class App extends Component {

    constructor(props) {
        super(props);

        this.state = { store: Store, };
    }

    render() {
        return (
            <Provider store={this.state.store}>
                <Router>
                    <Route path='/:pageId?' render={(props) => <HomePage {...props} />} />
                </Router>
            </Provider>
        );
    }
}

export default App;
