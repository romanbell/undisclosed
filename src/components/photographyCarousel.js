import React, { Component } from 'react';

  const RIGHT_ARROW = 39;
  const LEFT_ARROW = 37; 

export default class MediaPhotoView extends Component {
    constructor(props) {
        super(props);

        this.nextPhoto = this.iter_to_next_idx.bind(this);
        this.prevPhoto = this.iter_to_prev_idx.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.state = {
            galleryPhotos: {'name': 'await'},
            artist_ids: [],
            idx: 0,
            max_idx: 1,
            loadingIndicator: "Loading...",
            xDown: null,
            yDown: null
        };
    }

    async componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);

        // This request just loads first image to improve response time 
        const headers = { 'Content-Type': 'application/json' }
        const response = await fetch('http://localhost:5000/api/v1/galleryphotographs?filename=0045.jpg', { headers })
        const JSONresponse = await response.json()
        this.setState({galleryPhotos: JSONresponse})
        this.setState({max_idx: this.state.galleryPhotos.galleryPhotographs.length - 1})
        this.loadAllPhotographs();
    }

    async loadAllPhotographs() {
      // console.log('loading all photographs')
      const headers = { 'Content-Type': 'application/json' }
      const response = await fetch('http://localhost:5000/api/v1/galleryphotographs', { headers })
      const JSONresponse = await response.json()
      // Add 0045.jpg to front of object so view won't change on full load response
      JSONresponse.galleryPhotographs.unshift(this.state.galleryPhotos.galleryPhotographs[0])
      this.setState({galleryPhotos: JSONresponse})
      this.setState({max_idx: this.state.galleryPhotos.galleryPhotographs.length - 1})
      this.setState({loadingIndicator: ""})
      // console.log('all photographs loaded')
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    get_binary_photo_data() {
        if (this.state.galleryPhotos.galleryPhotographs !== undefined) {
            return this.state.galleryPhotos.galleryPhotographs[this.state.idx].data_bin         
        }
        else {
            return '---'
        }
    }

    get_photo_date() {
        if (this.state.galleryPhotos.galleryPhotographs !== undefined) {
            return this.state.galleryPhotos.galleryPhotographs[this.state.idx].date_formatted            
        }
        else {
            return '---'
        }
    }

    get_photo_location() {
        if (this.state.galleryPhotos.galleryPhotographs !== undefined) {
            return this.state.galleryPhotos.galleryPhotographs[this.state.idx].location            
        }
        else {
            return '---'
        }
    }

    iter_to_next_idx() {
        if (this.state.idx === this.state.max_idx){
            this.setState({idx: 0})
        }
        else {
            this.setState({idx: this.state.idx + 1})
        }
    }

    iter_to_prev_idx() {
        if (this.state.idx === 0){
            this.setState({idx: this.state.max_idx})
        }
        else {
            this.setState({idx: this.state.idx - 1})
        }
    }

  handleKeyDown(event) {
    if (event.keyCode === LEFT_ARROW) {
      if (this.state.idx === 0) {this.setState({idx: this.state.max_idx})}
      else {this.setState({idx : this.state.idx - 1})}
        }
    else if (event.keyCode === RIGHT_ARROW) {
      if (this.state.idx === this.state.max_idx) {this.setState({idx:  0})}
      else {this.setState({idx: this.state.idx + 1})}
    }
  }

  render() {
    return(   
      <div>
        <div className='Media'>
          <div className='PhotoSpacer'> </div>
            <img src={`data:image/jpeg;base64,${this.get_binary_photo_data()}`} className="HomePhoto" alt={this.get_photo_location()}></img>
        </div> 

        <div className='PhotoButtonWrapper'>
            <div className='PhotoButtons'>
              <div className='LeftButton'>
                <p role='button' onKeyDown = {(e) => this.handleKeyDown(e)} onClick={() => this.iter_to_prev_idx()}> &#60; </p>
              </div>
              <div className='RightButton'>
                <p role='button' onClick={() => this.iter_to_next_idx()}> &#62; </p>
              </div>
            </div>
            <div className='PhotoLoadingIndicator'>
              <p>{this.state.loadingIndicator}</p>
            </div>
            <div className='ImageInfo'>
              <p>{this.get_photo_location()}</p>
              <p>{this.get_photo_date()}</p> 
            </div>
          </div>
      </div>
      );
  }
}
