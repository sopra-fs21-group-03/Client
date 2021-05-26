import React, { Component } from 'react';
import SpotifyAuthWindow from "./SpotifyAuthWindow"
import getTrackURIs from "./Playlist"
import VolumeSlider from './VolumeSlider';
import styled from 'styled-components';
import volumeControl from './volume-control-white.png';

const VolumeSettings = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export var spotifyPlayerObject = {
    player: undefined
}

class SpotifyPlayer extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            spotifyAccessToken: "",
            spotifyDeviceId: "",
            spotifyAccess: false,
            spotifyPlayerReady: false
        };
        this.spotifyPlayer = this.props.spotifyPlayer ? this.props.spotifyPlayer : undefined ;
        

        window.addEventListener("storage", this.authorizeSpotifyFromStorage);

    }

    authorizeSpotifyFromStorage = (e) => {
        console.log("storage was changed")

        if (e.key === "SPOTIFY_ACCESS_TOKEN") {
            console.log("Token set and event cauhgt");
            const spotifyAccessToken = e.newValue;

            const spotifyAccess = localStorage.getItem("SPOTIFY_ACCESS");

            if (spotifyAccessToken !== null) {
                this.setState({
                    spotifyAccessToken: spotifyAccessToken,
                    spotifyAccess: spotifyAccess,
                });
            }
            if (window.Spotify !== null) {
                this.spotifyPlayer = new window.Spotify.Player({
                    name: "Spotify Player",
                    getOAuthToken: cb => {
                        cb(spotifyAccessToken);
                    },
                    volume: 0.01
                })
                console.log("connecting to player...")
                this.connectToPlayer();
            }
        }

    }

    /*componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("props",this.props)
        console.log("spotifyPlayer in SpotifyPlayer.js", this.spotifyPlayer)
        console.log("spotifyPlayer in SpotifyPlayer.js as Object ", spotifyPlayerObject)
        this.props.setSpotifyPlayer(this.spotifyPlayer)
    }*/

    connectToPlayer = () => {
        if (this.spotifyPlayer) {
            clearTimeout(this.connectToPlayerTimeout);

            // Ready
            this.spotifyPlayer.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                this.setState({
                    loadingState: "spotify player ready",
                    spotifyDeviceId: device_id,
                    spotifyPlayerReady: true
                });
                this.startPlayback();
                this.props.setSpotifyPlayer(this.spotifyPlayer)
            });

            // Not Ready
            this.spotifyPlayer.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });
            console.log("actual connecting call")
            this.spotifyPlayer.connect(); // here the two responseExceptions happen
            console.log("after actual connecting call")
        } else {
            this.connectToPlayerTimeout = setTimeout(this.connectToPlayer.bind(this), 1000);
        }

    }

    startPlayback = () => {
        console.log("Playback starts")
        if (this.state.device_id === "") {
            setTimeout(() => {
                this.startPlayback();
            }, 1000);
            return;
        }
        if (!this.state.spotifyPlayerReady) {
            return;
        }
        getTrackURIs(this.state.spotifyAccessToken).then(
            uris => {
                fetch("https://api.spotify.com/v1/me/player/play?" +
                    "device_id=" + this.state.spotifyDeviceId, {
                    method: 'PUT',
                    body: JSON.stringify({ uris: uris }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.state.spotifyAccessToken}`
                    }
                }).then((ev) => {
                    console.log(ev);
                    if (ev.status === 403) {
                        console.log("403 from fetch")
                        this.setState({
                            loadingState: "you need to upgrade to premium for playback",
                            spotifyAccess: false
                        });
                    } else {
                        this.setState({
                            loadingState: "playback started",
                            playbackOn: true, playbackPaused: false
                        });
                        console.log("Started playback", this.state);
                    }
                }).catch((error) => {
                    this.setState({ loadingState: "playback error: " + error });
                })
            })
    };

    setVolume = volume => {
        this.spotifyPlayer.setVolume(volume).then(() => this.spotifyPlayer.getVolume().then(volume => console.log(volume)));
    }

    render() {
        if (this.spotifyPlayer) {
            return (
                <VolumeSettings>
                    <img
                        class="soundImg"
                        src={volumeControl}
                        height={"100%"}
                        width={"auto"} />
                    <VolumeSlider
                        onChange={this.setVolume}
                        spotifyPlayer={this.spotifyPlayer}
                    />
                </VolumeSettings>
            );
        }
        else return null;
    }

}

export default SpotifyPlayer;
