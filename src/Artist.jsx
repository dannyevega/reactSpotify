import React, { Component } from 'react';

export default class Artist extends Component {
  render(){
    let artist = {
      name: '',
      followers: {
        total: ''
      },
      images: [{url: ''}],
      genres: []
    }

    artist = this.props.artist !== null ? this.props.artist : artist

    return (
      <div className='artist'>
        <img
          alt='artist'
          className='avatar'
          src={artist.images[0].url}
        />
        <div className='artist-info'>
          <div className='artist-name'>{artist.name}</div>
          <div className='artist-followers'>
            {artist.followers.total} followers
          </div>
          <div className='artist-genres'>
            {
              artist.genres.map((genre, idx) => {
                genre = genre !== artist.genres[artist.genres.length - 1] ? ` ${genre}, ` : ` & ${genre}`
                return (
                  <span key={idx}>{genre}</span>
                )
              })
            }
          </div>
        </div>
      </div>      
    )
  }
}