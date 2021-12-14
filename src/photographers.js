import HeaderComponent from './HeaderComponent.js';
import React, { Component } from 'react';

// function importAll(r) {
//     let images = {};
//     r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
//     return images;
// }

// const images = importAll(require.context('./photographers/joe_thomas', false, /\.(png|jpe?g|svg)$/));
// const img_keys = Object.keys(images)
// const img_values = Object.values(images)
// const imported_filenames = []
// for (let i = 0; i < img_values.length; i++){
//     imported_filenames.push(img_values[i].default)
//     // console.log(img_values[i].default)
// }
// const imgDataObject = {};
// for (let i = 0; i < img_keys.length; i++){
// imgDataObject[img_keys[i]] = imported_filenames[i]
// }

export default class Photographers extends Component {
    render() {
        return(
            <div className='Canvas'> 
                <div className='photographersCanvas'>
                    <div className='photographersTitle'>
                        <p>Some miscellaneous photographers from across the inernet, I own none of these photos :(</p>
                    </div>

                    <div className='photographersWrapper'>
                        <div className='photographersItem'>
                                    <div className='photographersNameWrapper'>
                                        <ul>
                                            <li><a href="http://www.morganmaassen.com/">Morgan Maassen</a></li>
                                            <li>Santa Barbra, California</li>
                                        </ul>
                                    </div>
                                    <div className='photographersScroller'>
                                        <ul>
                                            <li>hodler a</li>
                                            <li>hodler b</li>
                                            <li>hodler c</li>
                                            <li>hodler d</li>
                                            <li>hodler e</li>
                                            <li>hodler f</li>
                                        </ul>
                                    </div>
                        </div>
                        <div className='photographersItem'>
                                    <div className='photographersNameWrapper'>
                                        <ul>
                                            <li><a href="https://cameronhammond.com/">Cameron Hammond</a></li>
                                            <li>Australia</li>
                                        </ul>
                                    </div>
                                    <div className='photographersScroller'>
                                        <ul>
                                            <li>hodler a</li>
                                            <li>hodler b</li>
                                            <li>hodler c</li>
                                            <li>hodler d</li>
                                            <li>hodler e</li>
                                            <li>hodler f</li>
                                        </ul>
                                    </div>
                        </div>
                        <div className='photographersItem'>
                                    <div className='photographersNameWrapper'>
                                        <ul>
                                            <li> <a href="http://www.joethomasphoto.com/">Joe Thomas</a></li>
                                            <li>New York, NY</li>
                                        </ul>
                                    </div>
                                    <div className='photographersScroller'>
                                        <ul>
                                            <li>hodler a</li>
                                            <li>hodler b</li>
                                            <li>hodler c</li>
                                            <li>hodler d</li>
                                            <li>hodler e</li>
                                            <li>hodler f</li>
                                        </ul>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        
        );
    }
}