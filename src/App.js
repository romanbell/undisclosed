// import logo from './logo.svg';
import React from "react";
// import norge from './NORGE.jpg';
// import imageData from './media_dir/img_data.json';
import './App.css';
import HeaderComponent from './HeaderComponent.js';
import MediaPhotoView  from "./MediaPhotoView.js";
// import listReactFiles from 'list-react-files'



// function useKey(key){
//   const [pressed, setPressed] = React.useState(false)

//   const match = event => key == event.key
//   const onDown = event => {
//     if(match(event)) setPressed(true)
//   }

//   const onUp = event => {
//     if(match(event)) setPressed(false)
//   }

//   React.useEffect(() => {
//     window.addEventListener('keydown', onDown)
//     window.addEventListener('keyUp', onUp)
//     return () => {
//       window.removeEventListener('keydown', onDown)
//       window.removeEventListener('keyup', onUp)
//     }
//   }, [key])
//   console.log('keypressed')
//   console.log(pressed)
//   return pressed
// }

////////// Need this ////////// need to figure out yhow to call handleImgSwitch
// document.body.addEventListener('keydown', this.handleImgSwitch);



function App() {

  // const rightKey = useKey("shift")

  // const nextPhoto = () => {
  //   if (idx == img_list.length - 1) {
  //     setState(0)
  //   }
  //   else {
  //     setState(idx + 1)
  //   }
  // };

  // const prevPhoto = () => {
  //   if (idx === 0) {
  //     setState(img_list.length - 1)
  //   }
  //   else {
  //     setState(idx - 1)
  //   }
  // };


 

  /////////// working ////////////////////
  // document.body.addEventListener('keydown', function(event) {
  //   console.log('event listener added')
  //   var key = event.keyCode || event.charCode || 0;
  //   // var key = event.keyCode;
  //   if (key === 39) {
  //     console.log('39 down')
  //     // nextPhoto()
  //   }
  //   if (key === 40) {
  //     console.log('40 down')
  //     // prevPhoto()
  //   }
  // });
  
  // document.body.removeEventListener('keyup', function(event) {
  //   // var key = event.keyCode || event.charCode || 0;
  //   var key = event.keyCode;
  //   if (key === 39) {
  //     console.log('39 up')
  //   }
  //   if (key === 40) {
  //     console.log('40 up')
  //   }
  // });

  // const getData=()=>{fetch('./media_dir/img_data.json')};
  // const dat = getData()
  // console.log(getData())

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
