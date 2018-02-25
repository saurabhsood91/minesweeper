
// Use ES6 destructuring to import stuff needed for React Routing
// var Route = require('react-router').Route // Otherwise

import React from 'react';
import ReactDOM from 'react-dom';
// import {Route, Router, IndexRoute, hashHistory} from 'react-router';

class MainComponent extends React.Component {
    render() {
        return (
            <p>Boilerplate React Code</p>
        );
    }
}


ReactDOM.render(
    <MainComponent/>,
    document.getElementById('app')
);
