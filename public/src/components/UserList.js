'use strict';
// const fs = require('fs');
 
import React, {Component, Fragment} from 'react';
import USERS from '../MOCK_DATA.js'



console.log('users', USERS);
class USERLIST extends Component {
  render() {
   return <Fragment>
    <h1>Users</h1>
    <p>{USERS.length} users</p>
    {USERS.map(user => {
      return <div>
        ({user.first_name})
        </div>
    })}
    </Fragment>
  }
}

export default USERLIST;