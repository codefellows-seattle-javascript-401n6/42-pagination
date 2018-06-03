import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      games: [],
      total: 0,
      gameTitle: '',
      index: 0
    }
  }

  componentDidMount = () => {
    this.getGames();
  }

  sortByTitle = () => {
    let games = this.state.games.slice();
    games.sort((g1, g2) => {
      if (g2.gameTitle < g1.gameTitle) {
        return 1;
      } else if (g2.gameTitle > g1.gameTitle) {
        return -1
      } else {
        return 0;
      }
    })
    this.setState({ games });
  }

  getGames = () => {
    this.setState({ loading: true });
    fetch('http://localhost:3000/api/games?skip=' + this.state.index)
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({
          loading: false,
          games: json.games,
          total: json.total
        })
      })
      .catch(err => console.log(err));
  }

  getPrev = () => {
    let index = Math.max(0, this.state.index - 10);
    this.setState({ index }, () => {
      this.getGames();
      this.updateUrl();
    })
  }

  getNext = () => {
    let index = Math.max(0, this.state.index + 25);
    this.setState({ index }, () => {
      this.getGames();
      this.updateUrl();
    })
  }

  updateUrl = () => {
    let url = '/?index=' + this.state.index;
    if (this.state.index == 0) {
      url = '/';
    }
    history.pushState({ index: 25 }, 'Search Results', url);
  }

  filter = (e) => {
    e.preventDefault();

    let qTitle = document.getElementById('title').value;

    if (!qTitle) {
      this.getGames();
    }

    let games = this.state.games.filter(game => {
      let titleMatch = !qTitle || game.gameTitle.includes(qTitle);
      return titleMatch;
    });

    this.setState({ games });
  }

  render() {
    return (
      <div className='wrapper'>
        <h1>Steam Data App</h1>

        <span>{this.state.index}-{this.state.index + 25} of {this.state.total} results</span>

        <div>
          <h2>Filter Games</h2>
          <button onClick={this.sortByTitle}>Sort By Title</button>
          <form onSubmit={this.filter}>
            <input id='title' type='text' placeholder='Search game by name'/>
            <button type='submit'>filter</button>
          </form>
        </div>

        {this.state.loading && <span>Loading...</span>}

        <table className='table'>
          <th className='th col-sm-3'>User ID</th>
          <th className='th col-sm-3'>Game Title</th>
          <th className='th col-sm-3'>Behavior Name</th>
          <th className='th col-sm-3'>Value</th>

          {!this.state.loading && this.state.games.map((game, i) => {
            return (
              <tr className='tr' key={game._id}>
                <td className='td col-sm-3'>{game.userId}</td>
                <td className='td col-sm-3'>{game.gameTitle}</td>
                <td className='td col-sm-3'>{game.behaviorName}</td>
                <td className='td col-sm-3'>{game.value}</td>
              </tr>
            )
          })}
        </table>

        <div>
          <button onClick={this.getPrev}>Prev</button>
          <button onClick={this.getNext}>Next</button>
        </div>

      </div>
    )
  }
}

export default App;
