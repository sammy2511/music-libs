import React, { Component } from 'react';
import './App.css'
import {FormGroup , FormControl, InputGroup, Glyphicon } from 'react-bootstrap'
import Profile from './Profile'
import Gallery from './Gallery'
import FeaturedContent from './FeaturedContent'

class App extends Component{
  constructor(props){
    super(props);
      this.state = {
        query:'',
        artist:null,
        tracks:null,
        albums:null
      }

  }

  getFeaturedList(){
    const BASE_URL_FEATURED = 'https://api.spotify.com/v1/browse/new-releases';
    var access_token = 'BQAfS2Ypj5ScH4zAMtFyC3I_79ofYIvrwDeY9PBQEn_YjPBHHwCMkmIqqos0Om7YspxRPN7l23QTwvpU2KRekj8onczET-KUeKsnQLtjZYqN709sI_CeQQimxJx48hqS36HOI_9yxWxrtTPORFBcuGIY5gEcfqOJUbzNOZC8AW50WH-tMQ';

    var myOptions = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
    mode: 'cors',
    cache: 'default'
    };

    fetch(BASE_URL_FEATURED,myOptions)
      .then(response => response.json())
      .then(json => {
        const albums = json.albums;
        this.setState({ albums });
      })
  }

  searchArtist(){
    const BASE_URL = 'https://api.spotify.com/v1/search?';

    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    var access_token = 'BQAfS2Ypj5ScH4zAMtFyC3I_79ofYIvrwDeY9PBQEn_YjPBHHwCMkmIqqos0Om7YspxRPN7l23QTwvpU2KRekj8onczET-KUeKsnQLtjZYqN709sI_CeQQimxJx48hqS36HOI_9yxWxrtTPORFBcuGIY5gEcfqOJUbzNOZC8AW50WH-tMQ'
    console.log(FETCH_URL);

      var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + access_token
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL,myOptions)
    // .then(json=> console.log(json))
      .then(response =>response.json())
      .then(json=>{
        const artist = json.artists.items[0];
        this.setState({artist});

        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US`;
        fetch(FETCH_URL,{
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + access_token
          },
          mode: 'cors',
          cache: 'default'
        })
          .then(response=>response.json())
          .then(json=>{
            const tracks = json.tracks;
            this.setState({tracks});
          })
      })
  }

  render(){
    this.getFeaturedList();
    return(
      <div className="App">
        <div className="App-title">Music Library Application</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type = "text"
              placeholder="Search for an Artist"
              value = {this.state.query}
              onChange = {event=>{this.setState({query:event.target.value})}}
              onKeyPress = {event=>{
                if(event.key === 'Enter'){
                  this.searchArtist()
                }
              }}
            />
            <InputGroup.Addon onClick = {()=>this.searchArtist()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !==null?
                            <div>
                              <Profile
                                artist = {this.state.artist}
                              />
                            <Gallery
                              tracks = {this.state.tracks}
                            />
                            </div>
                            : <FeaturedContent
                              albums = {this.state.albums}
                            />
        }
      </div>
    );
  }
}

export default App;
