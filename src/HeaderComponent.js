import React, { Component } from 'react';

function toggleSubnav(listName) {
    var element = document.getElementsByClassName(listName)[0];
    // console.log(element)
    // console.log(getComputedStyle(element)['visibility'])
  
    if (getComputedStyle(element)['visibility'] == 'hidden'){
    element.style.visibility = 'visible'
    element.style.display = 'block'
    }
    else {
      element.style.visibility = 'hidden'
      element.style.display = 'none'
    }
  }


export default class HeaderComponent extends Component {

  render() {
    return(
        <div className='Header'>
              <div className='Title'>
                <h1> undisclosed media ● 未公开媒体 ● 미공개 매체 ● 未公開のメディア </h1>
              </div>
    
              <div className='Navbar'>
                  <ul>
                    <li role='button' onClick={() => toggleSubnav("SublistA")}>Visual</li>
                      <div className='Subnav'>
                        <div className='SublistA'>
                          <ul>
                            <li>Photography</li>
                            <li>Digital Art</li>
                            <li>Design</li>
                            <li>Selected 2D</li>
                          </ul>
                        </div>
                      </div>
                    <li role='button' onClick={() => toggleSubnav("SublistB")}>Audio</li>
                      <div className='Subnav'>
                        <div className='SublistB'>
                          <ul>
                            <li>Spotify</li>
                            <li>Labels</li>
                            <li>This Week</li>
                          </ul>
                        </div>
                      </div>
                    <li role='button' onClick={() => toggleSubnav("SublistC")}>Text</li>
                      <div className='Subnav'>
                        <div className='SublistC'>
                          <ul>
                            <li>Reading List</li>
                            <li>Goodreads</li>
                          </ul>
                        </div>
                      </div>
                    <li role='button' onClick={() => toggleSubnav("SublistD")}>Interactive</li>
                      <div className='Subnav'>
                        <div className='SublistD'>
                          <ul>
                            <li>Tech</li>
                            <li>tbd ab</li>
                            <li>tbd ac</li>
                          </ul>
                        </div>
                      </div>
                    <li role='button' onClick={() => toggleSubnav("SublistE")}>Digital </li>
                      <div className='Subnav'>
                        <div className='SublistE'>
                          <ul>
                            <li>tbd aa</li>
                            <li>tbd bb</li>
                            <li>tbd bc</li>
                          </ul>
                        </div>
                      </div>
                    <li role='button' onClick={() => toggleSubnav("SublistF")}>. . .</li>
                      <div className='Subnav'>
                        <div className='SublistF'>
                          <ul>
                            <li>call me</li>
                            <li>email me</li>
                            <li>message me?</li>
                          </ul>
                        </div>
                      </div>
                  </ul>
              </div>
            </div>
      );
  }
}