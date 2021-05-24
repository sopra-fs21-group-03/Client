import React, { Component } from "react";
import Header from "./views/Header";
import AppRouter from "./components/shared/routers/AppRouter";
import Spotify from "./components/music/Spotify";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 */
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spotifyPlayer: undefined,
    }
  }

  setSpotifyPlayer = spotifyPlayer => {
    //let spotifyPlayer = spotifyPlayerObject;
    console.log("param of function", spotifyPlayer)
    this.setState({spotifyPlayer});
    //console.log("new spotify Player", this.state.spotifyPlayer)
  }

  componentDidUpdate() {
    console.log("new SpotifyPlayer after didUpdate", this.state.spotifyPlayer)
  }

  render() {
    /*
    window.onbeforeunload = () => {
        // Clear localStorage when window/browser is closed
        localStorage.clear();
    }

     */
    return (
      <div>
        <Header height={"100"} setSpotifyPlayer={this.setSpotifyPlayer} />
        <AppRouter 
        spotifyPlayer={this.state.spotifyPlayer}
        setSpotifyPlayer={this.setSpotifyPlayer}/>
      </div>
    );
  }
}

export default App;
