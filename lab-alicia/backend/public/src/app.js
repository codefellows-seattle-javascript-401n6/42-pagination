import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import HAPPINESS from '../happiness';

export default class App extends Component {
  state = {
    isLoading: true,
    happiness: [],
    total: 0,
    country: undefined,
    rank: 0,
    index: 0,
  }

  componentDidMount = () => {
    console.log('mounted');
    this.getHappinessData();
  }

  filter = (ev) => {
    ev.preventDefault();

    let qCountry = document.getElementById('country').val;
    let qScore = document.getElementById('score').val;
    let qRank = document.getElementById('rank').val;

    if (!qCountry && !qScore && !qRank) {
      this.setState({happiness: HAPPINESS});
      return;
    }

    let happiness = HAPPINESS.filter(happiness => {
      let country = happiness[0];
      let score = happiness[1];
      let rank = happiness[2];

      return countryMatches = !qCountry || country.includes(qCountry);
    });
    this.setState({happiness});
  }

// Sort by country, sort by happiness rank, sort by happiness score
sortByCountry = () => {
  console.log('happiness', this.state.happiness);
  let ratings = this.state.happiness.ratings.slice();
  ratings.sort((h1, h2) => {
    if (h2.country < h1.country) {
      return 1;
    } else if (h2.country > h1.country) {
      return -1;
    } else {
      return 0;
    }
  });
  this.setState({happiness: {ratings: ratings}});
}

sortByRank = () => {
  let ratings = this.state.happiness.ratings.slice();
  ratings.sort((h1, h2) => {
    if (h2.rank < h1.rank) {
      return 1;
    } else if (h2.rank > h1.rank) {
      return -1;
    } else {
      return 0;
    }
  });
  this.setState({happiness: {ratings: ratings}});
}

sortByScore = () => {
  let ratings = this.state.happiness.ratings.slice();
  ratings.sort((h1, h2) => {
    if (h2.score < h1.score) {
      return 1;
    } else if (h2.score > h1.score) {
      return -1;
    } else {
      return 0;
    }
  });
  this.setState({happiness: {ratings: ratings}});
}

getHappinessData = () => {
  this.setState({isLoading: true});

  fetch('/ratings?skip=' + this.state.index)
  .then(res => res.json())
  .then(json => {
    console.log('results:', json);
    this.setState({
      isLoading: false,
      happiness: json,
      total: json.total,
    });
  });
}

prev = () => {
  this.setState({index: this.state.index - 10}, this.getHappinessData)
};

next = () => {
  this.setState({index: this.state.index + 10}, this.getHappinessData)
};

updateUrl = () => {
  let url = "/?index=" + this.state.index;
  if (this.state.index == 0) {
    url = "/";
  }
  history.pushState({index: 10}, "Search Results", url);
};

render() {
  return <Fragment>
  <h1>Happiness Ratings Around the World</h1>
  <p>
    {this.state.index}-{this.state.index + 10} of {this.state.total} results.
  </p>
  <p>
    <button onClick={this.prev}>prev</button>
    <button onClick={this.next}>next</button>
  </p>
  <form onSubmit={this.filter}>
    <input id="country" type="text" placeholder="country name" />
    <input id="rank" type="number" placeholder="happiness rank" />
    <input id="score" type="number" placeholder="happiness score" />
    <button type="submit">filter</button>
  </form>
  <p>
    <button onClick={this.sortByCountry}>sort by country</button>
    <button onClick={this.sortByScore}>sort by score</button>
    <button onClick={this.sortByRank}>sort by rank</button>
  </p>

  {this.state.isLoading && <p>Loading...</p>}
  
  {console.log('happiness', this.state.happiness)}
  {!this.state.isLoading && this.state.happiness.ratings.map((rating, i) => {
    return <div key={rating._id}>{rating.country} {rating.rank} {' '} {rating.score} {' '}</div>
  })}
    </Fragment>
  }
}

let root = document.getElementById('root');
ReactDOM.render(<App />, root);