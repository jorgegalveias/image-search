import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import HomePage from './components/Pages/HomePage';

//Add FontAwesome Icons
library.add(fas)
class App extends Component {
    render() {
        return (
            <HomePage />
        );
    }
}

export default App;
