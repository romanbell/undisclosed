import React, { Component } from 'react';

export default class AboutPage extends Component {
    
    render() {
        return(
            <div className="coolSitesWrapper">
                <div className="subheadingWrapper">
                    <div className="subheadingTitle">
                        <p>How I Built This Website</p>
                    </div>
                    <div className="subheadingCaption">
                        <p>Largely hacked together with duct tape and prayers, it's a miracle this made it to the internet</p> 
                        <br></br>
                    </div>
                </div>
              
                <div className='wrappedScrollBox'>
                    <div className="aboutWrapper">
                        <ul>
                            <span> About</span>
                            <li> This site started as a way to learn proper JavaScript development practices and eventually evolved into something corny that I wanted 
                                to put on the internet. The source code definitely is not elegant, but it seems to get the job done for now. Initial inspiration
                                borrowed from <a href="https://www.morganmaassen.com/" target="_blank" rel="noreferrer noopener"> this dude.</a> In whole, thank you for
                                visiting my little corner of the internet.</li> 
                            <br></br>

                            <span> Design </span>
                            <li> <a href="https://www.mongodb.com" target="_blank" rel="noreferrer noopener"> Mongodb </a> - NoSQL document database </li>
                            <li> <a href="https://expressjs.com" target="_blank" rel="noreferrer noopener"> ExpressJS </a>  - Back end framework for NodeJS </li>
                            <li> <a href="https://nodejs.org" target="_blank" rel="noreferrer noopener"> NodeJS </a> - Javascript runtime environment </li>
                            <li> <a href="https://reactjs.org" target="_blank" rel="noreferrer noopener"> ReactJS </a> - Front end library for building user interface</li>
                            <br></br>
                            
                            <span> Data Sources </span>
                            <li> Photography - These are all photos that I have taken, please do not steal</li>
                            <li> Photographers - Mostly sourced from notes app, bookmarket tabs and people I follow on Instagram</li>
                            <li> Spotify - Sourced Spotify via their public users & playlists API</li>
                            <li> Reading List - Sourced from Goodreads using standard desktop methods (copy paste). Sad news from the source, "As of December 8th 2020, 
                                Goodreads is no longer issuing new developer keys for our public developer API"</li>
                            <li> Cool Sites - Again, sourced through a combination of notes, bookmarks and screenshots</li>


                        </ul>
                    </div>
                </div>      
            </div>
        );
    }
}