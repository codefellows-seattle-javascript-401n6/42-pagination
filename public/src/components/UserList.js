'use strict';
// const fs = require('fs');
 
import React, {Component, Fragment} from 'react';
// import USERS from '../scripts/read.js';

export default class USERLIST extends Component {
  state = {
    isLoading: true,
    users: [],
    index: 0,
    total: undefined,
  }
  componentDidMount = () => {
    console.log('16 mounted');
    this.getUserData();

  }
  getUserData = () => {
    this.setState({isLoading: true});
    console.log('21 fetching');

    fetch('/api/user?skip=' + this.state.index)
    .then(res => res.json())
    .then(json => {
      console.log('25 results:json', json);
      this.setState({
        users: json.users,
        total: json.total,
        isLoading: false,
      })
    })
  }
   next = () => {
    this.setState({index: this.state.index + 10}, this.getUserData)
  }

  render() {
   return <Fragment>
    <h1>Users</h1>
    <p>
    {this.state.index}-{this.state.index + 10} of {this.state.total}users
    </p>
    <p>
        <button onClick={this.prev}>prev</button>
        <button onClick={this.next}>next</button>
      </p>
    {this.isLoading && <p>loading...</p>}
    {!this.isLoading && this.state.users.map(user => {
      return <div key={user.id}>
        {user.originalId} {user.first_name}  {user.last_name} 
        </div>
    })}
    </Fragment>
  }
}

