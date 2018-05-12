import React, { Component } from 'react';

export default class Gallery extends Component {
  constructor(props){
    super(props);

    this.state = {
      playingPreview: '',
      audio: null,
      playing: false
    }
  }

  playPreview = (previewUrl) => {
    let previewAudio = new Audio(previewUrl);
    // if there is no current preview playing
    if(!this.state.playing){
      previewAudio.play();
      this.setState({
        playing: true,
        playingPreview: previewUrl,
        audio: previewAudio
      })
    } else {
      // if you click on same thumbnail to pause current playing preview
      if(this.state.playingPreview === previewUrl){
        this.state.audio.pause();
        this.setState({
          playing: false
        })
      } else {
        // when you click a different thumbail to pause current and play next
        this.state.audio.pause();
        previewAudio.play();
        this.setState({
          playing: true,
          playingPreview: previewUrl,
          audio: previewAudio
        })        
      }
    }
  }

  render(){
    const { tracks } = this.props;
    return (
      <ul className='gallery'>
        {tracks.map((track, idx) => {
          console.log('track', track);
          let albumImg = track.album.images[0].url;
          return (
            <li key={idx} className='album' onClick={() => this.playPreview(track.preview_url)}>
              <img 
                alt='album'
                src={albumImg}
                className='album-image'
              />
              <div className="track-play">
                <div className="track-play-inner">                  
                  {
                    this.state.playingPreview === track.preview_url ? <span>| |</span> : <span>&#9654;</span>
                  }
                </div>
              </div>  
              <p className='album-info'>
                {track.name}
              </p>
            </li>
          )
        })}
      </ul>
    )
  }
}