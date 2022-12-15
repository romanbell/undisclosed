// TODO:
// - Fix this err "Warning: Each child in a list should have a unique "key" prop."
// - Squash all commits into one
// - Build shuffle method for photos
// - Collapse all subnavs once link is clicked (right now does just one)

import React from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Title from './components/title.js';
import Navbar from './components/navbar.js';
import MediaPhotoView  from "./components/photographyCarousel.js";
import Photographers from "./components/photographers";
import CoolSites from "./components/coolSites";
import Footer from "./components/footer";
import Contact from "./components/contact";
import ReadingList from "./components/readingList";
import SpotifyWrapped from "./components/wrapped";
import AboutPage from "./components/about.js";
// import DevComponent from "./components/devtest";

const BASE_URL = process.env.REACT_APP_BASE_URL_REQUEST;

function App() {
  return (
    <div className='App'>
      <div className='Canvas'>
        <Title />
        <Navbar />
          <div className='mediaWrapper'>
            <Routes>
              <Route path="/" element={<MediaPhotoView baseURL={BASE_URL}/>} />
              <Route path="/photographers" element={<Photographers baseURL={BASE_URL}/>} />
              <Route path="/coolSites" element={<CoolSites baseURL={BASE_URL}/>} />
              <Route path="/contact" element={<Contact baseURL={BASE_URL}/>} />
              <Route path="/readingList" element={<ReadingList baseURL={BASE_URL}/>} />
              <Route path="/wrapped2022" element={<SpotifyWrapped baseURL={BASE_URL} key="2" year="2022"/>} />
              <Route path="/wrapped2021" element={<SpotifyWrapped baseURL={BASE_URL} key="1" year="2021"/>} />
              <Route path="/wrapped2020" element={<SpotifyWrapped baseURL={BASE_URL} key="0" year="2020"/>} />
              <Route path="/about" element={<AboutPage />} />
              {/* <Route path="/dev" element={<DevComponent />} /> */}
            </Routes>
          </div>
        <Footer />
      </div>
    </div>

  );
}

export default App;
