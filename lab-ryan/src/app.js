import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import SONGS from '../public/songs.js'; //public folder

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            songs: [],
            total: 0,
            index: 0,
            artist: undefined,
            title: undefined,
            loading: true
        }

        this.getSongs = this.getSongs.bind(this);
        this.getPrev = this.getPrev.bind(this);
        this.getNext = this.getNext.bind(this);
    }

    componentDidMount() {
        this.getSongs();
    }

    getSongs= ()=> {
        console.log('getSongs')
        this.setState({
            loading: true
        });
        fetch('http://localhost:3000/api/songs?index=' + this.state.index)
            .then(res => res.json())
            .then(json => {
                console.log("json", json)
                this.setState({
                    songs: json.songs,
                    total: json.total,
                    loading: false,
                });
            });
    }
    getPrev() {
        console.log('state before', this.state);
        let newIndex = this.state.index - 10;
        this.setState({
            index: newIndex
        }, () => {
            this.getSongs();
            // this.updateUrl();
        });
        console.log('state after', this.state);
    }

    getNext() {
        console.log('state before', this.state);
        let newIndex = this.state.index + 10;
        this.setState({
            index: newIndex
        }, () => {
            this.getSongs();
            // this.updateUrl();
        });
        console.log('state after', this.state);
    }

    // updateUrl = () => {
    //     let url = '/?index=' + this.state.index;
    //     if (this.state.index == 0) {
    //         url = '/';
    //     }
    //     history.pushState({
    //         index: 10
    //     }, 'search results', url);
    // }

    render() {
        
        return <Fragment>

            <h1>Artist/Song App</h1>
            <p> {this.state.index} to {this.state.index + 10} of {this.state.total} results. 
            </p>
            {/* <div>
                {this.state.index > 9 && <button onClick={this.getPrev}>Previous</button>}
                {this.state.songs.length === 10 && <button onClick={this.getNext}>Next</button>}
            </div> */}
            {this.state.loading && <p>Loading...</p>} 
            {!this.state.loading && this.state.songs.map((songs, index) => {
                return <div key={index}>{songs.artist}{songs.title}</div>
                
            })}
            </Fragment>
        }
    }

    let root = document.getElementById('root');
    ReactDOM.render(<App /> ,root);