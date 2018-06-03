'use strict';

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
// import SUPERS from '../supers';

class App extends Component {
  state = {
    loading: true
  };

  render() {
    return (
      <Fragment>
        <h1> My app</h1>
        <p>this is where my hero data will go is this working still working?</p>
      </Fragment>
    );
  }
}

let root = document.getElementById('root');
ReactDOM.render(<App />, root);
