import React, { Component, useState, useEffect} from 'react';



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
  
  const img_list = Object.keys(images)

  const KEY_ESCAPE = 27; 


  window.addEventListener("keydown", console.log('kd'))


export default class MediaPhotoView extends Component {
  constructor(props) {
    super(props);
    this.nextPhoto = this.nextPhoto.bind(this);
    this.prevPhoto = this.prevPhoto.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = { idx: 0};
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }








  
  nextPhoto(){
    if (this.state.idx == img_list.length - 1) {this.setState({idx:  0})}
    else {this.setState({idx: this.state.idx + 1})}
  };

  prevPhoto(){
    if (this.state.idx === 0) {this.setState({idx: img_list.length - 1})}
    else {this.setState({idx : this.state.idx - 1})}
  };

  tiddy() {console.log(this.state)};

  handleKeyDown(event) {
    console.log(this.state)

    if (event.keyCode === KEY_ESCAPE) {
      if (this.state.idx === 0) {this.setState({idx: img_list.length - 1})}
      else {this.setState({idx : this.state.idx - 1})}
        }
  }


// // Hook
//  useKeyPress(targetKey) {
//   // State for keeping track of whether key is pressed
//   // const [keyPressed, setKeyPressed] = this.useState<boolean>(false);
//   // If pressed key is our target key then set to true
//   function downHandler({ key }) {
//     if (key === targetKey) {
//       this.setState({keyPressed: true});
//       this.prevPhoto();
//     }
//   }

//   // Add event listeners
//   this.useEffect(() => {
//     window.addEventListener("keydown", downHandler);
//     // Remove event listeners on cleanup
//     return () => {
//       window.removeEventListener("keydown", downHandler);
//     };
//   }, []); // Empty array ensures that effect is only run on mount and unmount
//   console.log('hooo')
//   return this.state.keyPressed;
// }


  render() {
    return(   
      <div classname='MediaWrapper'>
        <div className='Media'>
          <div className='PhotoSpacer'> </div>
          <img src={imgDataObject[img_list[this.state.idx]].static} className="HomePhoto"></img>

        </div> 

        <div className='PhotoButtonWrapper'>
            <div className='PhotoButtons'>
              <div className='LeftButton'>
                <span role='button' onKeyDown = {(e) => this.handleKeyDown(e)} onClick={() => this.nextPhoto()}>{this.tiddy()} &#60; </span>
              </div>
              <div className='RightButton'>
                <span role='button' onClick={() => this.prevPhoto()}> &#62; </span>
              </div>
            </div>
            <div className='ImageInfo'>
              <p>{imgDataObject[img_list[this.state.idx]].location}</p>
              <p>{imgDataObject[img_list[this.state.idx]].date}</p> 
            </div>
          </div>
      </div>
      );
  }
}
