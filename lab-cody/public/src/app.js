import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  state = {
    songs: [],
    isLoading: false,
    total: 0,
    min: null,
    max: null,
    index: 0
  };

  componentDidMount() {
    this.getSongs();
  }

  getSongs = () => {
    this.setState({ isLoading: true });
    fetch('/songs?skip=' + this.state.index)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoading: false,
          songs: json.songs,
          total: json.total
        });
      });
  };

  getPrev = () => {
    console.log('getting prev');
    let index = Math.max(0, this.state.index - 10);
    this.setState({ index }, () => {
      this.getSongs();
    });
  };

  getNext = () => {
    console.log('getting next');
    let index = this.state.index + 10;
    this.setState({ index }, () => {
      this.getSongs();
    });
  };

  setIndex = ev => {
    ev.preventDefault();
    let index = ev.target.index.value * 1;
    this.setState({ index: index }, () => {
      this.getSongs();
    });
  };

  render() {
    return (
      <Fragment>
        <h1>Spotify top songs 2017</h1>
        <p>
          {this.state.index}-{this.state.index + 10} of {this.state.total}{' '}
          results.
        </p>
        <form onSubmit={this.setIndex}>
          <input name="index" type="number" placeholder="skip to a number" />
          <button type="submit">GO</button>
        </form>

        {this.state.loading && <p>Loading...</p>}

        {!this.state.loading &&
          this.state.songs.map((song, i) => {
            return (
              <div key={song.id}>
                <p>name: {song.name}</p>
                <p>artists: {song.artists}</p>
                <p>danceability: {song.danceability}</p>
                <p>energy: {song.energy}</p>
                <p>duration: {song.duration}</p>
              </div>
            );
          })}

        <p>
          <button onClick={this.getPrev}>previous 10</button>
          <button onClick={this.getNext}>next 10</button>
        </p>
      </Fragment>
    );
  }
}

let root = document.getElementById('root');
ReactDOM.render(<App />, root);
