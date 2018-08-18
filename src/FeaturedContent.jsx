import React , { Component } from 'react'
import './App.css'

class FeaturedContent extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    const albums = this.props.albums;
    return(
      albums !== null ?

      <div>
          <div>Trending Albums</div>
            {
              albums.items.map((album, k) => {
                const albumImg = album.images[0].url;
                console.log('album',album);
                return (
                  <div
                    key={k}
                    className="track"
                  >
                    <img
                      src={albumImg}
                      className="track-img"
                      alt="track"
                    />

                    <p className="track-text">
                      {album.name}
                    </p>
                  </div>
                )
              }
            )}
          </div> :<div></div>
    )
  }
}
export default FeaturedContent;
