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

  getPrev = () => {
    console.log('getting prev')
    let index = Math.max(0, this.state.index - 10);
    this.setState({index}, () => {
      this.getplayers();
      
    });
  }

  getNext = () => {
    console.log('getting next')
    let index = this.state.index + 10;
    this.setState({index}, () => {
      this.getplayers();
      
    });
  }

  setIndex = (ev) =>{
    ev.preventDefault();
    let index = ev.target.index.value * 1;
    this.setState({index: index}, () => {
      this.getplayers();
    })
    
  }

   render() {
    return <Fragment>
      <h1>NFL Football Players</h1>
      <p>
        {this.state.index}-{this.state.index + 10} of {this.state.total} results.
      </p>
      <form onSubmit={this.setIndex}>
        <input name="index" type="number" placeholder="enter a number to jump ahead"/>
        <button type="submit">GO</button>
      </form>

      {this.state.loading && <p>Loading...</p>}

      {!this.state.loading && this.state.players.map((player, i) => {
        return <div key={player._id}>
        <p>name: {player.name}</p>
        <p>position: {player.position}</p>
        <p>current team: {player.current_team}</p>
        <p>height: {player.height}</p>
        <p>DOB: {player.birth_date}</p>
        </div>
      })}

      <p>
        <button onClick={this.getPrev}>previous 10</button>
        <button onClick={this.getNext}>next 10</button>
      </p>
    </Fragment>
  }

}

let root = document.getElementById('root');
ReactDOM.render(<App />, root);