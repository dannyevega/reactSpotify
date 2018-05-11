import React, { Component } from 'react';

export default class Gallery extends Component {
  render(){
    const { tracks } = this.props;
    return (
      <ul className='gallery'>
        {tracks.map((track, idx) => {
          let albumImg = track.album.images[0].url;
          return (
            <li key={idx} className='album'>
              <img 
                alt='album'
                src={albumImg}
                className='album-image'
              />
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