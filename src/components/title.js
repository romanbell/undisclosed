import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 

export default class Title extends Component {
  render() {
    return(
          <div className='Title'>
            <h1><Link to="/">undisclosed media ● documenting my interests through hypertext </Link></h1>
          </div>
      );
  }
}