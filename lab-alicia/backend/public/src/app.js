import React, {Component, Fragment} from 'react';
import {
  BrowserRouter, 
  Route,
  Link
} from 'react-router-dom';
import ReactDOM from 'react-browser-router';
import HAPPINESS from '../happiness';

class App extends Component {
render() {
  return <Fragment>
  <h1>Happiness Ratings Around the World</h1>
    </Fragment>
  }
}

let root = document.getElementById('root');
React.render(<App />, root);