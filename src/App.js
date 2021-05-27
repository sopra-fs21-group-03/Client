import React, { Component } from "react";
import Header from "./views/Header";
import AppRouter from "./components/shared/routers/AppRouter";
import CircularTimer from "./components/game/timer/CircularTimer";

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
    console.log("param of function", spotifyPlayer)
    this.setState({spotifyPlayer});
  }

  componentDidUpdate() {
    console.log("new SpotifyPlayer after didUpdate", this.state.spotifyPlayer)
  }

  render() {
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
