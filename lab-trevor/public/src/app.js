import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';


class App extends Component {
  state={
    players: [],
    isLoading: false,
    total: 0,
    min: null,
    max: null,
    index: 0,
  }

  componentDidMount() {
    this.getplayers();
  }

  getplayers = () => {
    this.setState({isLoading: true});
    fetch('/players?skip=' + this.state.index)
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoading: false,
        players: json.players,
        total: json.total,
      });
    });
  }

   render() {
    return <Fragment>
      <h1>NFL Football Players</h1>
      <p>
        {this.state.index}-{this.state.index + 10} of {this.state.total} results.
      </p>
      {/* <form onSubmit={this.filter}>
        <input id="name" type="text" placeholder="name"/>
        <input id="minyear" type="number" placeholder="start year"/>
        <input id="maxyear" type="number" placeholder="end year" />
        <button type="submit">filter</button>
      </form> */}
      {/* <p>
        <button onClick={this.sortByYear}>sort by year</button>
        <button onClick={this.sortByTitle}>sort by title</button>
      </p> */}

      {/* {this.state.loading && <p>Loading...</p>} */}

      {!this.state.loading && this.state.players.map((player, i) => {
        console.log('player', player.current_team)
        return <div key={player._id}>
        <p>{player.name}</p>
        <p>{player.current_team}</p>
        
        </div>
      })}

      {/* <p>
        <button onClick={this.getPrev}>previous</button>
        <button onClick={this.getNext}>next</button>
      </p> */}
    </Fragment>
  }

}

let root = document.getElementById('root');
ReactDOM.render(<App />, root);