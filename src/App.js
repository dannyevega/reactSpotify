import React, { Component } from 'react';
import Artist from './Artist';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchQuery: '',
      artist: null
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
    let accessToken = 'BQAt0MMl2IJ7eZTsV_RH8uBu0GS_Y52SoEzg2F3SQm2AhKHMqHnn_U2jmq6lW9S-4rO_GDxu7M4eNMPANTj-bl4TiQLXiwZaAiT4EDUf-Mm_OpT-cHOYRObnn65bH7DADqy9VK7uEskM98ATW2xPxzDiMawk&refresh_token=AQCWM8aAwiHTu4SE6FGK5rV4jBLLRn7a7gmKTndTN1wTDmlG7TRV1VT271pb5J2o8eS1_p7RpCpIGuIruTft26_TZxvbNnVLZ1xQn22R_qCuKUf3bVsPGn7hKzAD-nirEsM';
    let FETCH_URL = `${BASE_URL}q=${this.state.searchQuery}&type=artist&limit=1&access_token=${accessToken}`;

    fetch(FETCH_URL, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      this.setState({ artist });
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
        <div className='row'>
          <Artist
            artist={this.state.artist}
          />
        </div>
      </div>
    )
  }
}