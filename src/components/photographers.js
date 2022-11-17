import React, { Component } from 'react';

// https://willadler.com/V2

export default class Photographers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            photographers: {'photographers': {'name': 'await'}},
            photographer_ids: [],
            idx: 0,
            max_idx: 0
        };
    }

    async componentDidMount() {
        // GET request using fetch with set headers
        const headers = { 'Content-Type': 'application/json' }
        const response = await fetch('http://www.undisclosedmedia.xyz/api/v1/photographers', { headers })
        const JSONresponse = await response.json()
        this.setState({photographers: JSONresponse})
        
        const { photographers } = this.state;
        var photographers_data_object = {}
        var photographer_ids = []
        if (photographers.photographers.name !== 'await') {

            for (let elem of photographers.photographers){
                photographer_ids.push(elem._id)
            }

            var j = 0; 
            for (let entry of photographers.photographers) {
                let tmp = {}
                tmp['artist_name'] = entry.title
                tmp['location'] = entry.loc_list_parsed
                // tmp['date_entered'] = entry.date_entered
                tmp['link'] = entry.title_link
                tmp['artist_type'] = entry.type
                photographers_data_object[photographer_ids[j]] = tmp
                j = j + 1;  
            }
        }
        else {
            photographers_data_object = ['No food to show, hope your are not hungry']
        }

        this.setState({photographer_ids: photographer_ids})
        this.setState({photographers: {photographers_data_object}})
        this.setState({idx: 0})
        this.setState({max_idx: j})
    }

    populate_photographers_element() {
        let row_array = []
        for (let i=0; i<this.state.max_idx; i++) {
            let entry = {}
            entry.rank = i+1
            entry.photographerName = this.get_artist_name(i)
            entry.photographerLocations = Object.values(this.get_photographer_location(i))
            entry.photographerLink = this.get_photographer_link(i)
            entry.artist_type = this.get_type(i)
            row_array.push(entry)
            }

        // console.log(row_array)
        return row_array
    }
    

    get_artist_name(idx) {
        if (this.state.photographers.photographers_data_object !== undefined) {
            return this.state.photographers.photographers_data_object[this.state.photographer_ids[idx]].artist_name            
        }
        else {
            return '---'
        }
    }

    get_photographer_location(idx) {
        if (this.state.photographers.photographers_data_object !== undefined) {
            return this.state.photographers.photographers_data_object[this.state.photographer_ids[idx]].location            
        }
        else {
            return '---'
        }
    }

    get_photographer_link(idx) {
        if (this.state.photographers.photographers_data_object !== undefined) {
            return this.state.photographers.photographers_data_object[this.state.photographer_ids[idx]].link            
        }
        else {
            return '---'
        }
    }

    get_type(idx) {
        if (this.state.photographers.photographers_data_object !== undefined) {
            return this.state.photographers.photographers_data_object[this.state.photographer_ids[idx]].artist_type            
        }
        else {
            return '---'
        }
    }

    render() {
        return(
            <div className="coolSitesWrapper">
                <div className="subheadingWrapper">
                    <div className="subheadingTitle">
                        <p>Photographers & Other Artists</p>
                    </div>
                    <div className="subheadingCaption">
                        <p>Some miscellaneous people from across the internet, I own none of these works :(</p> 
                        <br></br>
                    </div>
                </div>

                <div className="wrappedScrollBox">
                    <div className="musicArtistsContentWrapper">
                        <ul>
                            {this.populate_photographers_element().map((row) => (
                                <li key={row.rank}>
                                    <span key={row.rank}>{row.rank} -- </span> 
                                    {/* <span>{parseInt(row.rank) <= 9 ? "\xa0": ""} - {"\xa0"}</span> */}
                                    <a key={row.photographerLink} href = {row.photographerLink} target="_blank" rel="noopener noreferrer"> {row.photographerName}</a>
                                    <span key={row.artist_type}> ({row.artist_type}) </span>
                                    {row.photographerLocations.length === 0 ? "": " -- "}
                                    {row.photographerLocations.map((location, index) => (
                                        // <span key={location.length}>  {location} {index === row.photographerLocations.length - 1 ? "" : "+"} </span>
                                        <span key={row.rank.toString().concat('-', index.toString()) }>  {location} {index === row.photographerLocations.length - 1 ? "" : "+"} </span>
                                        ))}
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
