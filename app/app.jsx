
// Use ES6 destructuring to import stuff needed for React Routing
// var Route = require('react-router').Route // Otherwise

import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'app/components/Container';
// import {Route, Router, IndexRoute, hashHistory} from 'react-router';

require('style!css!sass!applicationStyles');

ReactDOM.render(
    <Container/>,
    document.getElementById('app')
);
