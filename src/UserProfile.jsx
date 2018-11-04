import React,{ Component } from 'react'
import './App.css'

class UserProfile extends Component{
constructor(props){
  super(props);

  this.state = {

  }
}

render(){
  console.log(this.props.user);

  return(
  <div className="user-profile">


    <img
      className = "user-image"
      alt="profile"
      src = 'http://icons.iconarchive.com/icons/custom-icon-design/silky-line-user/512/user-icon.png'
    />


  <div className="user-info">
    <div className="user-name">{this.props.user.display_name}</div>
    <div className="user-followers">{this.props.user.followers.total} Followers</div>
    <div className="user-genres">ID: {this.props.user.id}
    </div>
  </div>
  </div>
  );
}

}

export default UserProfile;
