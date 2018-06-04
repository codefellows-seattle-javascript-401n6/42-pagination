'use strict';
import React, {Component, Fragment} from 'react';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

import ReactDOM from 'react-dom';

class HomePage extends Component {
  render() {
   return <Fragment>
    <h1>App</h1>
    <p>stuff and things</p>
    <p><Link to="/other">Other</Link></p>
    </Fragment>
  }
}

class OtherPage extends Component {
  render() {
   return <Fragment>
    <h1>Other Page</h1>
    <p>Other stuff and things</p>
    <p><Link to="/">Home</Link></p>
    </Fragment>
  }
}

class App extends Component {
  render(){
    return <BrowserRouter>
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/other" component={OtherPage} />
    </Fragment>
    </BrowserRouter>
  }
}

let root = document.getElementById('root');
ReactDOM.render(<App/>, root);