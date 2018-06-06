import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render(){
        return<React.Fragment>
            <h1>NBA Player Salaries</h1>
            <h2>2017 - 2018</h2>
            </React.Fragment>
    }
}

const root = document.getElementById('root');
ReactDOM.render(<App/>, root);