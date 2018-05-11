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

    console.log(artist)

    return (
      <div className='column'>
        <img
          alt='artist'
          className="avatar"
          src={artist.images[0].url}
        />
        <div>{artist.name}</div>
        <div>{artist.followers.total}</div>
        <div>
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
    )
  }
}