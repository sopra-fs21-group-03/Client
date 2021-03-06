import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import Login from "../../login/Login";
import Register from "../../login/Register";
import GameScreen from "../../game/GameScreen";
import LobbyScreen from "../../login/LobbyScreen";
import InLobbyScreen from "../../login/InLobbyScreen";
import {LobbyGuard} from "../routeProtectors/LobbyGuard";
import PokerInstructions from "../../Instructions/PokerInstructionsScreen";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>
            <Route
                path="/login"
                exact
                render={() => (
                    <Login />
                )}
            />
              <Route
                  path="/pokerInstructionsScreen"
                  exact
                  render={() => (
                      <PokerInstructions/>
                  )}
              />

            <Route path="/" exact render={() => <Redirect to={"/login"} />} />
              <Route
                  path="/register"
                  exact
                  render={() => (
                          <Register />
                  )}
              />
              <Route path="/" exact render={() => <Redirect to={"/login"} />} />
              <Route
                  path="/gamescreen"
                  exact
                  render={() => (
                      <GameGuard>
                        <GameScreen spotifyPlayer={this.props.spotifyPlayer}
                        setSpotifyPlayer={this.props.setSpotifyPlayer}/>
                      </GameGuard>
                  )}
              />
              <Route
                  path="/lobbyscreen"
                  exact
                  render={() => (
                      <LobbyGuard>
                          <LobbyScreen />
                      </LobbyGuard>
                  )}
              />
              <Route path="/" exact render={() => <Redirect to={"/login"} />} />
              <Route
                  path="/lobby"
                  exact
                  render={() => (
                      <InLobbyScreen />
                  )}
              />
              <Route path="/" exact render={() => <Redirect to={"/login"} />} />
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default AppRouter;
