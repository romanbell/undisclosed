import React, { Component } from 'react';
// import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
// import Photographers from './components/photographers';

function toggleSubnav(listName) {
    var element = document.getElementsByClassName(listName)[0];
    // console.log(element)
    // console.log(getComputedStyle(element)['visibility'])
  
    if (getComputedStyle(element)['visibility'] === 'hidden'){
    element.style.visibility = 'visible'
    element.style.display = 'block'
    }
    else {
      element.style.visibility = 'hidden'
      element.style.display = 'none'
    }
  }


export default class Navbar extends Component {

  render() {
    return(
        <div className='Header'>   
              <div className='Navbar'>
                  <ul>
                    <li role='button' onClick={() => toggleSubnav("SublistA")}>Visual</li>
                      <div className='Subnav'>
                        <div className='SublistA'>
                          <ul>
                            <li onClick={() => toggleSubnav("SublistA")}><Link to="/">Photography</Link></li>
                            <li onClick={() => toggleSubnav("SublistA")}><Link to="/photographers">Artists</Link></li>
                          </ul>
                        </div>
                      </div>
                    <li role='button' onClick={() => toggleSubnav("SublistB")}>Audio</li>
                      <div className='Subnav'>
                        <div className='SublistB'>
                          <ul>
                            <li onClick={() => toggleSubnav("SublistB")}><Link to="/wrapped2022">2022</Link></li>
                            <li onClick={() => toggleSubnav("SublistB")}><Link to="/wrapped2021">2021</Link></li>
                            <li onClick={() => toggleSubnav("SublistB")}><Link to="/wrapped2020">2020</Link></li>
                          </ul>
                        </div>
                      </div>
                    <li role='button' onClick={() => toggleSubnav("SublistC")}>Text</li>
                      <div className='Subnav'>
                        <div className='SublistC'>
                          <ul>
                            <li onClick={() => toggleSubnav("SublistC")}><Link to="/readingList">Reading List</Link></li>
                          </ul>
                        </div>
                      </div>
                    {/* <li role='button' onClick={() => toggleSubnav("SublistD")}>Interactive</li>
                      <div className='Subnav'>
                        <div className='SublistD'>
                          <ul>
                            <li>Code</li>
                            <li onClick={() => toggleSubnav("SublistD")}><Link to="/dev">Devtest_me</Link></li>
                          </ul>
                        </div>
                      </div> */}
                    <li role='button' onClick={() => toggleSubnav("SublistE")}>Digital</li>
                      <div className='Subnav'>
                        <div className='SublistE'>
                          <ul>
                            <li onClick={() => toggleSubnav("SublistE")}><Link to="/coolSites">Cool Sites</Link></li>
                          </ul>
                        </div>
                      </div>
                    <li role='button' onClick={() => toggleSubnav("SublistF")}>. . .</li>
                      <div className='Subnav'>
                        <div className='SublistF'>
                          <ul>
                            <li onClick={() => toggleSubnav("SublistF")}><Link to="/about">About</Link></li>
                            {/* <li onClick={() => toggleSubnav("SublistF")}><Link to="/contact">Email me</Link></li> */}
                            <li onClick={() => toggleSubnav("SublistF")}><Link to="/contact">Contact</Link></li>
                          </ul>
                        </div>
                      </div>
                  </ul>
              </div>
            </div>
      );
  }
}