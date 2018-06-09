'use strict';
// const fs = require('fs');
 
import React, {Component, Fragment} from 'react';
import USERS from '../scripts/read.js'

class USERLIST extends Component {
  render() {
   return <Fragment>
    <h1>Users</h1>
    <p>{USERS.length} users</p>
    {USERS.map(user => {
      return <div key={user.id}>
        {user.originalId} {user.first_name}  {user.last_name} 
        </div>
    })}
    </Fragment>
  }
}

export default USERLIST;