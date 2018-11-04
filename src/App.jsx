import React, { Component } from 'react';
import './App.css'
import {FormGroup , FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import lodash from 'lodash';
import queryString from 'query-string';
import Profile from './Profile'
import Gallery from './Gallery'
import UserProfile from './UserProfile'
import FeaturedContent from './FeaturedContent'

class App extends Component{
  constructor(props){
    super(props);
      this.state = {
        access_token:null,
        query:'',
        artist:null,
        tracks:null,
        albums:null,
        user:null,
        errorMessage:'',
        val:''
      }

  }

  componentWillMount(){
    let parsed = queryString.parse(window.location.search);
    let access_token = parsed.access_token;
    console.log(access_token);
    if (!access_token)
      return;
    this.setState({access_token});

    var myOptions = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
    mode: 'cors',
    cache: 'default'
    };
    fetch('https://api.spotify.com/v1/me',myOptions)
    .then(response => response.json())
    .then(json => {
      this.setState({user:json});
    })
  }

  getFeaturedList(){
    const BASE_URL_FEATURED = 'https://api.spotify.com/v1/browse/new-releases';
    var myOptions = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + this.state.access_token
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
    console.log(FETCH_URL);

      var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.state.access_token
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL,myOptions)
    // .then(json=> console.log(json))
      .then(response =>response.json())
      .then(json=>{
        if(!lodash.isEmpty(json.artists.items)){
          const artist = json.artists.items[0];
          this.setState({artist});
          this.setState({errorMessage:'',val:'none'});

        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US`;
        fetch(FETCH_URL,{
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + this.state.access_token
          },
          mode: 'cors',
          cache: 'default'
        })
          .then(response=>response.json())
          .then(json=>{
            const tracks = json.tracks;
            this.setState({tracks});
          })
        }else{
          this.setState({errorMessage:'Artist Not Found',val:'block'});
        }
      })
  }

  render(){
    this.getFeaturedList();
    return(
      <div className="">
      {
        this.state.user !==null ?
          <div>
            <UserProfile
              user = {this.state.user}
              />
          </div>:
          <div>
          </div>
      }
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
          <div class="alert alert-danger" role="alert" style ={{display : this.state.val}}>
          {this.state.errorMessage}
          </div>

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
                          </div>:<div>
                             <FeaturedContent
                              albums = {this.state.albums}
                            /></div>
        }
      </div>
      </div>
    );
  }
}

export default App;
