import React, {Component, Fragment} from 'react';

import ReactDOM from 'react-dom';

// require('dotenv').config();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      honey: [],
      total: 0,
      index: 0,
      isLoading: false
    }

    this.getHoneyData = this.getHoneyData.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }
  

  componentDidMount() {
    this.getHoneyData();
  }

  getHoneyData() {
    this.setState({isLoading: true});
    fetch('http://localhost:3000/api/honey?index=' + this.state.index)
    .then(res => res.json())
    .then(json => {
      this.setState({
        honey: json.honey,
        total: json.total,
        isLoading: false
      });
    });
  }

  nextPage() {
    console.log('this state', this.state);
    let newIndex = this.state.index + 10;
    this.setState({
      index: newIndex
    }, () => {
      this.getHoneyData();
    });
    console.log('this state 2', this.state);
  }

  prevPage() {
    console.log('this state', this.state);
    let newIndex = this.state.index - 10;
    this.setState({
      index: newIndex
    }, () => {
      this.getHoneyData();
    });
    console.log('this state 2', this.state);
  }

  render() {
    return <Fragment>
      <h1>US Honey Production Information</h1>
      <h2>{this.state.index} to {this.state.index + 10} of Total Results: {this.state.total}</h2>

      {this.state.index > 9 && <button onClick={this.prevPage}>Previous</button>}

      {this.state.honey.length === 10 && <button onClick={this.nextPage}>Next</button>}

      {this.state.isLoading && <p>Loading...</p>}

      {!this.state.isLoading && this.state.honey.map((honey) => {
        return <div key={honey._id}>{honey.state} {honey.year}</div>
      })}
      </Fragment>
  }
}

let root = document.getElementById('root');
ReactDOM.render(<App />, root);