import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tedTalks: [],
            total: 0,
            index: 0,
            isLoading: false
        }
        
        this.getTedTalksData = this.getTedTalksData.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
    }

    componentDidMount() {
        this.getTedTalksData();
    }

    getTedTalksData() {
        console.log('inside get ted talks data');
        this.setState({isLoading: true});
        fetch('http://localhost:3000/api/TedTalks?index=' + this.state.index)
        .then(res => res.json())
        .then(json => {
            this.setState({
                tedTalks: json.tedTalks,
                total: json.total,
                isLoading: false
            });
        });
    }

    nextPage() {
        let newIndex = this.state.index + 10;
        console.log('this state', newIndex);
        this.setState({
            index: newIndex
        }, () => {
            console.log('this state 3', this.state);
            this.getTedTalksData()
        });
        console.log('this state 2', this.state);
    }

    prevPage() {
        console.log('this state', this.state);
        let newIndex = this.state.index - 10;
        this.setState({
            index: newIndex
        }, () => {
            this.getTedTalksData();
        })
        console.log('this state 2', this.state);
    }

    render() {
        return <Fragment>
            <h1>Ted Talks</h1>
            <h2>{this.state.index} to {this.state.index + 10} of Total Results: {this.state.total}</h2>

            {this.state.index <= 5112 && <button onClick={this.nextPage}>Next</button>}
            {this.state.index >= 10 && <button onClick={this.prevPage}>Previous</button>}
            {this.state.isloading && <p>Loading...</p>}

            {!this.state.isLoading && this.state.tedTalks.map((tedTalks) => {
                return <div key={tedTalks._id}>{tedTalks.event} {tedTalks.speaker} {tedTalks.title} {tedTalks.url}</div>
            })}
    </Fragment>
    }
}

let root = document.getElementById('root');
ReactDOM.render(<App />, root);