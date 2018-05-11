import React, { Component } from 'react';
import Artist from './Artist';
import Gallery from './Gallery';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchQuery: '',
      artist: null,
      tracks: []
    }
  }

  handleChange = (e) => {
    let value = e.target.value ? e.target.value : '';

    this.setState({
      searchQuery: value
    });
  }

  submitData = (e) => {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    // access token has limit and will expire. need to go back to spotify example page and run the build to get new token
    let accessToken = 'BQBlrgeVuF2d-DOYMDKgkMKTcOvqKKxXF91ZE7dbl5rYCCPVzccfKcbD4x4XUH0pNkHFL5TnTDZX3JAUG_Gc1H4chYi5wQ83kcOC4caqPJISi6E3Mq-6xOvOK7gAPyA_ZmNFlln8civExizumS5KNxlkMdJ1&refresh_token=AQC96DV_gbON3IqeAD0UqIjku-X2Snee3f6tp_QdnyRcX06N__Zz-KkcHlGlp1-XKdrstUHyuR3nsIeWFWt_XQXNUc0ZCOd37fHNkCTGR-NpnAKRWp7EsxeGvsFiEiE0ymc';
    let FETCH_URL = `${BASE_URL}q=${this.state.searchQuery}&type=artist&limit=1&access_token=${accessToken}`;
    let ALBUM_URL = 'https://api.spotify.com/v1/artists/'

    fetch(FETCH_URL, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        this.setState({ artist });

        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&access_token=${accessToken}`
        fetch(FETCH_URL, {
          method: 'GET'
        })
          .then(response => response.json())
          .then(json => {
            // console.log(json);
            const { tracks } = json;
            this.setState({ tracks });
            // console.log(this.state);
          })

      })
  }  

  render(){
    return (
      <div className='container'>
        <h1>Spotify Artist Master</h1>
        <div className='row'>
          <FormGroup className='column' onSubmit={this.submitData}>
            <InputGroup>
              <FormControl
                type='text'
                placeholder='search artist name...'
                value={this.state.searchQuery}
                onChange={this.handleChange}
                onKeyPress={e => {
                  if(e.key === 'Enter'){
                    this.submitData();
                  }
                }}
              />
              <InputGroup.Addon onClick={() => this.submitData()}>
                <Glyphicon glyph='search'></Glyphicon>
              </InputGroup.Addon>                
            </InputGroup>
          </FormGroup>
        </div>        
        {
          this.state.artist !== null
          ?
            <div>
              <div className='artist-container'>
                <Artist
                  artist={this.state.artist}
                />
              </div>
              <div>
                <Gallery
                  tracks={this.state.tracks}
                />
              </div> 
            </div>            
          : <div></div>
        }
      </div>
    )
  }
}