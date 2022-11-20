import React, { Component } from 'react';
// const RIGHT_ARROW = 39;
// const LEFT_ARROW = 37; 
// window.addEventListener("keydown", console.log('kd'))


export default class SpotifyWrapped extends Component {
  constructor(props) {
    super(props);

    this.state = {
        tracks: {'tracks': {'name': 'await'}},
        year: props.year,
        baseURL: props.baseURL,
        track_ids: [],
        idx: 0,
        maxIdx: 100
        };
    }

    async componentDidMount() {
        // GET request using fetch with set headers
        const headers = { 'Content-Type': 'application/json' }
        const reqURL = this.state.baseURL + '/api/v1/spotifyWrappedTracks?year=' + this.state.year
        const response = await fetch(reqURL, { headers })
        const JSONresponse = await response.json()
        this.setState({tracks: JSONresponse})
        
        const { tracks } = this.state;
        var tracks_data_obj = []
        var track_ids = []
        if (tracks.tracks.name !== 'await') {

            for (let elem of tracks.tracks){
                track_ids.push(elem._id)
            }

            var j = 0; 
            for (let entry of tracks.tracks) {
                let tmp = {}
                tmp['rank'] = entry.rank
                tmp['track_name'] = entry.track.name
                tmp['album_name'] = entry.track.album.name
                tmp['popularity'] = entry.track.popularity
                tmp['track_link'] = entry.track.external_urls.spotify
                tmp['preview_link'] = entry.track.preview_url
                tmp['duration_ms'] = entry.track.duration_ms
                let artists_tmp = {}
                let a_idx = 0
                for (let artist of entry.track.artists) {
                    let a_tmp = {}
                    a_tmp['artist_name'] = artist.name
                    a_tmp['artist_link'] = artist.external_urls.spotify
                    artists_tmp[a_idx] = a_tmp
                    a_idx = a_idx + 1
                }
                tmp['artists'] = artists_tmp
                tracks_data_obj.push(tmp)
                j = j + 1;  
            }
            // console.log(tracks_data_obj)
        }
        else {
            tracks_data_obj = ['No tracks to show!']
        }

        this.setState({track_ids: track_ids})
        this.setState({tracks: {tracks_data_obj}})
        this.setState({idx: 0})
    }

    componentWillUnmount() {
        // window.removeEventListener('keydown', this.handleKeyDown);
    }

    millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    get_rank(idx) {
        if (this.state.tracks.tracks_data_obj !== undefined) {
            return this.state.tracks.tracks_data_obj[idx].rank      
        }
        else {
            return '---'
        }
    }

    get_track(idx) {
        if (this.state.tracks.tracks_data_obj !== undefined) {
            return this.state.tracks.tracks_data_obj[idx].track_name      
        }
        else {
            return '---'
        }
    }

    get_track_link(idx) {
        if (this.state.tracks.tracks_data_obj !== undefined) {
            return this.state.tracks.tracks_data_obj[idx].track_link      
        }
        else {
            return '---'
        }
    }

    get_track_preview_link(idx) {
        if (this.state.tracks.tracks_data_obj !== undefined) {
            return this.state.tracks.tracks_data_obj[idx].preview_link      
        }
        else {
            return '---'
        }
    }

    get_track_popularity(idx) {
        if (this.state.tracks.tracks_data_obj !== undefined) {
            return this.state.tracks.tracks_data_obj[idx].popularity      
        }
        else {
            return '---'
        }
    }

    get_artist_list(idx) {
        if (this.state.tracks.tracks_data_obj !== undefined) {
            return this.state.tracks.tracks_data_obj[idx].artists    
        }
        else {
            return '---'
        }
    }

    get_track_duration(idx) {
        if (this.state.tracks.tracks_data_obj !== undefined) {
            return this.millisToMinutesAndSeconds(this.state.tracks.tracks_data_obj[idx].duration_ms)    
        }
        else {
            return '---'
        }
    }

    populate_wrapped_element() {
        let row_array = []
        for (let i=0; i<100; i++) {
            let entry = {}
            entry.rank = this.get_rank(i)
            entry.trackName = this.get_track(i)
            entry.trackLink = this.get_track_link(i)
            entry.trackPreviewLink = this.get_track_preview_link(i)
            entry.artists = Object.values(this.get_artist_list(i))
            entry.popularity = this.get_track_popularity(i) 
            entry.duration = this.get_track_duration(i)
            row_array.push(entry)
            }
        return row_array
    }


    render() {
        // console.log(Object.values(this.get_artist_list(5))[0].artist_name)
        // console.log(this.get_artist_list(4))
        return (
            <div>
                <div className="subheadingWrapper">
                    <div className="subheadingTitle">
                        <p>Top Tracks {this.state.year}</p>
                    </div>
                    <div className="subheadingCaption">
                        <p>Sourced from Spotify, P Indicates Spotify's Popularity Score</p> 
                        <br></br>
                    </div>
                </div>

                <div className="wrappedScrollBox">
                    <div className="musicArtistsContentWrapper">
                        <ul>
                            {
                            this.populate_wrapped_element().map((row) => (
                                <li>
                                    {row.rank} --  
                                    <a href = {row.trackLink} target="_blank" rel="noopener noreferrer"> {row.trackName}</a> -- 
                                    {row.artists.map((artist, index) => (
                                        <a href = {artist.artist_link} target="_blank" rel="noopener noreferrer"> {artist.artist_name}{index === row.artists.length - 1 ? "" : ","} </a>
                                    ))}
                                    <span> -- {row.duration} -- P{row.popularity}</span> --
                                    <a href = {row.trackPreviewLink} target="_blank" rel="noopener noreferrer"> Listen </a>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                </div>
            </div>            
        );
    }
} 
