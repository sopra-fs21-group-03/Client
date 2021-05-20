import React, {Component} from 'react';
import SpotifyPlayer from './SpotifyPlayer';
import Spotify_Logo_RGB_Green from "./Spotify_Logo_RGB_Green.png"
import {SpotifyButton} from "../../views/design/SpotifyButton";
import SpotifyAuthWindow from "./SpotifyAuthWindow";


class Spotify extends Component {

    view = null;
    authWindow = null;

    constructor() {
        super();

        const hashStr = window.location.hash; // everything in address after #, here spotify puts successfull auth tokens
        const searchStr = window.location.search; // everything in address after ?, here spotify puts access denials
        const hashParams = decodeHashParams(hashStr.slice(1, hashStr.length));
        const searchParams = decodeHashParams(searchStr.slice(1, searchStr.length));

        this.state = {
            showSpotifyAuthWindow: false,
        };

        if (hashParams.access_token) {
            localStorage.setItem("SPOTIFY_ACCESS", "true");
            localStorage.setItem("SPOTIFY_ACCESS_TOKEN", hashParams.access_token);
            //setSpotifyTokenExpirationTime(hashParams.expires_in);
            window.close();
        } else if (searchParams.error) {
            localStorage.setItem("SPOTIFY_ACCESS", "false");
            window.close();
        } else {
            this.view = <SpotifyPlayer
                trackId="spotify:track:2AmSzVEGntmfAVvRy7W4ET"
            />;
            this.authWindow = <div> <SpotifyAuthWindow/> </div>
        }
    }

    render() {
        return (
            <SpotifyButton onClick={async () => {
                this.setState({showSpotifyAuthWindow: true})
                setTimeout(() =>{
                    this.setState({showSpotifyAuthWindow: false})
                }, 1000);
            }}>
                <img src={Spotify_Logo_RGB_Green} alt={"Spotify"} height={"15%"} width={"15%"}/>
                {this.state.showSpotifyAuthWindow ?
                    this.authWindow : null}
                {this.view}
            </SpotifyButton>

        )
    }

}

export default Spotify;

/**
 * decodes a parameter string (p1=v1&p2=v2&... syntax) into the object {p1: v1, p2: v2, ...}
 */
function decodeHashParams(str) {
    const hashParams = {};
    const a = /\+/g;  // Regex for replacing addition symbol with a space
    const r = /([^&;=]+)=?([^&;]*)/g;
    const d = (s) => decodeURIComponent(s.replace(a, " "));
    let e;

    while (e = r.exec(str)) {
        hashParams[d(e[1])] = d(e[2]);
    }
    return hashParams;
}
