import React, { Component } from 'react';

export default class CoolSites extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            baseURL: this.props.baseURL,
            sites: {'sites': {'name': 'await'}},
            site_ids: [],
            idx: 0,
            maxIdx: 50
        };
    }
    
    async componentDidMount() {
        // GET request using fetch with set headers
        const headers = { 'Content-Type': 'application/json' }
        const reqURL = this.state.baseURL + '/api/v1/coolsites?types=Music,Misc,Art,Photography,Design,Writing,Biography'
        const response = await fetch(reqURL, { headers })
        const JSONresponse = await response.json()
        this.setState({sites: JSONresponse})
        
        const { sites } = this.state;
        var sites_data_obj = []
        var site_ids = []
        if (sites.sites.name !== 'await') {
    
            for (let elem of sites.sites){
                site_ids.push(elem._id)
            }
    
            var j = 0; 
            for (let entry of sites.sites) {
                let tmp = {}
                tmp['title'] = entry.title
                tmp['title_link'] = entry.title_link
                tmp['creator_name'] = entry.creator_name
                tmp['creator_link'] = entry.creator_link
                tmp['city'] = entry.city
                tmp['country'] = entry.country
                tmp['date_added_str'] = entry.date_added_str
                tmp['type'] = entry.type
                sites_data_obj.push(tmp)
                j = j + 1;  
            }
            this.setState({maxIdx: j})
            // console.log(sites_data_obj)
        }
        else {
            sites_data_obj= ['No tracks to show!']
        }
    
        this.setState({site_ids: site_ids})
        this.setState({sites: {sites_data_obj}})
        this.setState({idx: 0})
    }

    componentWillUnmount() {
    }
    
    get_title(idx) {
        if (this.state.sites.sites_data_obj !== undefined) {
            return this.state.sites.sites_data_obj[idx].title      
        }
        else {
            return '---'
        }
    }

    get_title_link(idx) {
        if (this.state.sites.sites_data_obj !== undefined) {
            return this.state.sites.sites_data_obj[idx].title_link      
        }
        else {
            return '---'
        }
    }

    get_creator_name(idx) {
        if (this.state.sites.sites_data_obj !== undefined) {
            return this.state.sites.sites_data_obj[idx].creator_name     
        }
        else {
            return '---'
        }
    }

    get_creator_link(idx) {
        if (this.state.sites.sites_data_obj !== undefined) {
            return this.state.sites.sites_data_obj[idx].creator_link      
        }
        else {
            return '---'
        }
    }

    get_date_added_str(idx) {
        if (this.state.sites.sites_data_obj !== undefined) {
            return this.state.sites.sites_data_obj[idx].date_added_str      
        }
        else {
            return '---'
        }
    }

    get_type(idx) {
        if (this.state.sites.sites_data_obj !== undefined) {
            return this.state.sites.sites_data_obj[idx].type      
        }
        else {
            return '---'
        }
    }

    get_city(idx) {
        if (this.state.sites.sites_data_obj !== undefined) {
            return this.state.sites.sites_data_obj[idx].city      
        }
        else {
            return '---'
        }
    }

    get_country(idx) {
        if (this.state.sites.sites_data_obj !== undefined) {
            return this.state.sites.sites_data_obj[idx].country      
        }
        else {
            return '---'
        }
    }

    populate_cool_sites_element() {
        let row_array = []
        for (let i=0; i<this.state.maxIdx; i++) {
            let entry = {}
            entry.rank = i + 1
            entry.title = this.get_title(i)
            entry.title_link = this.get_title_link(i)
            entry.creator_name = Object.values(this.get_creator_name(i))
            entry.creator_link = Object.values(this.get_creator_link(i))
            entry.city = this.get_city(i)
            entry.country = this.get_country(i)
            entry.date_added = this.get_date_added_str(i)
            row_array.push(entry)
            }
        return row_array
    }
    


    render() {
        return(
            <div className="coolSitesWrapper">
                <div className="subheadingWrapper">
                    <div className="subheadingTitle">
                        <p>Some interesting items from across the internet</p>
                    </div>
                    <div className="subheadingCaption">
                        <p>Cool people building cool things</p> 
                        <br></br>
                    </div>
                </div>
              
                <div className="wrappedScrollBox">
                    <div className="musicArtistsContentWrapper">
                    <ul>
                        {/* should add notes section into db so this looks better */}
                        {this.populate_cool_sites_element().map((row) => (
                            <li>
                                <span>{row.rank} </span> 
                                <a href = {row.title_link} target="_blank" rel="noopener noreferrer">-- {row.title} </a>
                                {row.creator_name.length === 0 ? "": "by "} 
                                {row.creator_name.map((name, index) => (
                                    <a href = {row.creator_link[index]} target="_blank" rel="noopener noreferrer"> {name} {index === row.creator_name.length - 1 ? "" : ","} </a>
                                ))}
                                {row.country.length === 0 ? "": " -- "}
                                {row.city.length === 0 ? "": row.city.concat(",")} {row.country.length === 0 ? "": row.country}
                                {/* -- {row.date_added} */}
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
