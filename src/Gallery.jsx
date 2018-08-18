import React , { Component } from 'react'
import './App.css'

class Gallery extends Component {
  constructor(props){
    super(props);
    this.state = {
      playing : false,
      playingUrl:'',
      audio:null
    }
  }

  playAudio(preview_url){
    let audio = new Audio(preview_url);

    if(!this.state.playing){
      audio.play();
      this.setState({
        playing:true,
        playingUrl:preview_url,
        audio:audio
      })
    }
    else {
      if(this.state.playingUrl===preview_url){
        this.state.audio.pause();
        this.setState({
          playing:false
        })
      }
      else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing:true,
          playingUrl:preview_url,
          audio:audio
        })
      }
    }
  }

  render(){
     const tracks = this.props.tracks;
    return(
      tracks !== null ?
      <div>
            {
              tracks.map((track, k) => {
                const trackImg = track.album.images[0].url;
                console.log('track',track);
                return (
                  <div
                    key={k}
                    className="track"
                    onClick = {() => this.playAudio(track.preview_url)}
                  >
                    <img
                      src={trackImg}
                      className="track-img"
                      alt="track"
                    />
                    <div className="track-play">
                      <div className="track-play-inner">

                        {
                          this.state.playingUrl === track.preview_url?
                          <span>||</span>:
                          <span>&#9654;</span>
                        }
                      </div>
                    </div>

                    <p className="track-text">
                      {track.name}
                    </p>
                  </div>
                )
              }
            )}
          </div> :<div></div>
    )
  }

}

export default Gallery;
