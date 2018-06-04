filter = (event) => {
        event.preventDefault();

        let queryArtist = document.getElementById('artist').value;
        let queryTitle = document.getElementById('title').value;

        if (!queryArtist && !queryTitle) {
            this.setState({
                songs: SONGS
            });
            return;
        }

        let songs = SONGS.filter(song => {
            console.log('artist', artist);
            let artist = song[1];
            console.log('title', title)
            let title = song[2];

            console.log('artistMatch', artistMatch);
            let artistMatch = !queryArtist || artist.includes(queryArtist);
            let titleMatch = !queryTitle || title.includes(queryTitle);
            return artistMatch && titleMatch;
        });
        this.setState({
            songs
        });
    }

    sortByArtist = () => {
        let songs = this.state.songs.slice();
        songs.sort((s1, s2) => {
            if (s2.artist < s1.artist) {
                return -1;
            } else if (s2.artist > s1.artist) {
                return 1;
            } else {
                return 0;
            }
        });
        this.setState({
            songs
        })
    }

    sortByTitle = () => {
        let songs = this.state.songs.slice();
        songs.sort((s1, s2) => {
            if (s2.title < s1.title) {
                return 1;
            } else if (s2.title > s1.title){
                return -1;
            } else {
                return 0;
            }
        });
        this.setState({
            songs
        });
    }

                <form onSubmit = {this.filter}>
                <input id="artist" type="text" placeholder="artist" />
                <input id="title" type="text" placeholder="title" />
                <button type="submit">filter</button>
            </form>
            <p>
                <button onClick ={this.sortByArtist}>sort by artist</button>
                <button onClick ={this.sortByTitle} >sort by title</button>
            </p> 

            })} 