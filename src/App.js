// import logo from './logo.svg';
import React from "react";
// import norge from './NORGE.jpg';
// import imageData from './media_dir/img_data.json';
import './App.css';
// import listReactFiles from 'list-react-files'

const homePhotoDetails = [
  {
    id: 1,
    name: 'untitled',
    date: '01942',
    dir: 'undisclosed/src/NORGE.jpg'
  },
  {
    id: 2,
    name: 'untitled',
    date: '01931',
    dir: './POOPDOLLA.jpg'
  }
];

function toggleSubnav(listName) {
  var element = document.getElementsByClassName(listName)[0];
  console.log(element)
  console.log(getComputedStyle(element)['visibility'])

  if (getComputedStyle(element)['visibility'] == 'hidden'){
  element.style.visibility = 'visible'
  element.style.display = 'block'
  }
  else {
    element.style.visibility = 'hidden'
    element.style.display = 'none'
  }
}


//// Populate imgDataObj
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('./media_dir', false, /\.(png|jpe?g|svg)$/));
const img_keys = Object.keys(images)
const img_values = Object.values(images)
const imported_filenames = []
for (let i = 0; i < img_values.length; i++){
  imported_filenames.push(img_values[i].default)
  // console.log(img_values[i].default)
}

const location_list = []
const photo_date_list = []
for (let i = 0; i < imported_filenames.length; i++){
  location_list.push('zzzzzzzzzzzzzzz')
  photo_date_list.push('20210109')
}
location_list[0] = 'aaaaaaaaa'
photo_date_list[0] = '123456'

function populateDictEntry(idx) {
  let tmp = {};
  tmp['static'] = imported_filenames[idx]
  tmp['location'] = location_list[idx]
  tmp['date'] = photo_date_list[idx]
  return tmp
}

const imgDataObject = {};
for (let i = 0; i < img_keys.length; i++){
  imgDataObject[img_keys[i]] = populateDictEntry(i)
}
console.log(imgDataObject)
console.log(img_keys.length)
console.log(require.context('./media_dir').keys().length)

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


  function nextPhoto(){
    if (idx == img_list.length - 1) {
      setState(0)
    }
    else {
      setState(idx + 1)
    }
  };

  function prevPhoto(){
    if (idx === 0) {
      setState(img_list.length - 1)
    }
    else {
      setState(idx - 1)
    }
  };

  const [idx, setState] = React.useState(0);
  const img_list = Object.keys(images)

  const handleImgSwitch = function(event) {
    console.log('event listener added')
    var key = event.keyCode || event.charCode || 0;
    // var key = event.keyCode;
    if (key === 39) {
      console.log('39 down')
      // nextPhoto()
    }
    if (key === 40) {
      console.log('40 down')
      // prevPhoto()
    }
  }

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
                        <li>Selected 2D</li>
                        <li>Digital Art</li>
                        <li>Design</li>
                      </ul>
                    </div>
                  </div>
                <li role='button' onClick={() => toggleSubnav("SublistB")}>Audio</li>
                  <div className='Subnav'>
                    <div className='SublistB'>
                      <ul>
                        <li>This Week</li>
                        <li>Spotify</li>
                        <li>Labels</li>
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
                        <li>tbd aa</li>
                        <li>tbd ab</li>
                        <li>tbd ac</li>
                      </ul>
                    </div>
                  </div>
                <li role='button' onClick={() => toggleSubnav("SublistE")}>Digital</li>
                  <div className='Subnav'>
                    <div className='SublistE'>
                      <ul>
                        <li>tbd ba</li>
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

        <div className='Media'>
          <div className='PhotoSpacer'> </div>
          {/* <img src={require(homePhotoDetails[0].dir)} className="HomePhoto"></img> */}
          <img src={imgDataObject[img_list[idx]].static} className="HomePhoto"></img>
          {/* <img src={norge} className="HomePhoto"></img> */}

        </div> 

        <div className='PhotoButtonWrapper'>
            <div className='PhotoButtons'>
              <div className='LeftButton'>
                <span role='button' onClick={() => nextPhoto()}> &#60; </span>
              </div>
              <div className='RightButton'>
                <span role='button' onClick={() => prevPhoto()}> &#62; </span>
              </div>
            </div>
            <div className='ImageInfo'>
              <p>{imgDataObject[img_list[idx]].location}</p>
              <p>{imgDataObject[img_list[idx]].date}</p> 
            </div>
          </div>

        <div className='Footer'>
          <p> For educational purposes only. This platform was created solely for shits & giggles providing no tangible value or legitimate offerings. Just tryna test out some tech stuff and maybe make something cool in the process. Adding in some extra text in here to fill up some blank space. Also a bit more text here... don't be a jackass. -RB</p>
        </div>
      </div>
    </div>

  );
}

export default App;
