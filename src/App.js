// TODO:
// - Figure out react-dom.development.js error ERR_INVALID_URL
// - Fix this err "Warning: Each child in a list should have a unique "key" prop."
// - Squash all commits into one
// - Build shuffle method for photos

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

function App() {
  return (
    <div className='App'>
      <div className='Canvas'>
        <Title />
        <Navbar />
          <div className='mediaWrapper'>
            <Routes>
              <Route path="/" element={<MediaPhotoView />} />
              <Route path="/photographers" element={<Photographers />} />
              <Route path="/coolSites" element={<CoolSites />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/readingList" element={<ReadingList />} />
              <Route path="/wrapped2021" element={<SpotifyWrapped key="1" year="2021"/>} />
              <Route path="/wrapped2020" element={<SpotifyWrapped key="2" year="2020"/>} />
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
