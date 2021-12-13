import React from "react";
import './App.css';
import HeaderComponent from './HeaderComponent.js';
import MediaPhotoView  from "./MediaPhotoView.js";

function App() {

  return (
    <div className='App'>
      <div className='Canvas'> 
        <HeaderComponent />
        <MediaPhotoView />

        <div className='Footer'>
          <p> For educational purposes only. This platform was created solely for shits & giggles providing no tangible value or legitimate offerings. Just tryna test out some tech stuff and maybe make something cool in the process. Adding in some extra text in here to fill up some blank space. Also a bit more text here... don't be a jackass. -RB</p>
        </div>
      </div>
    </div>

  );
}

export default App;
