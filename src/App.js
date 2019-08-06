import React, {Component} from 'react';
import UserList from './containers/UserList';
import UserCard from './containers/UserCard';

import './App.css';

class App extends Component {

    render() {
        return (
            <div className="App">
                <UserList/>
                <UserCard/>
            </div>
        );
    }
}

export default App;
