import React, { Component } from 'react';
import SpotifyAuthWindow from "./SpotifyAuthWindow"

class SpotifyPlayer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            spotifyAccessToken: "",
            spotifyDeviceId: "",
            spotifyAccess: false,
            spotifyPlayerReady: false
        };
        this.spotifyPlayer = undefined;

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
                console.log("Connecting to player...")
            }
            if (window.Spotify !== null) {
                setTimeout(() => {
                    this.spotifyPlayer = new window.Spotify.Player({
                        name: "Spotify Player",
                        getOAuthToken: cb => {
                            cb(spotifyAccessToken);
                        },
                        volume: 0.01
                    })
                }, 1000)
                setTimeout(() => {
                    this.connectToPlayer();
                }, 1000)
            }
        }

    }

    connectToPlayer = async () => {
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
                this.startPlayback(this.props.trackId);
            });

            // Not Ready
            this.spotifyPlayer.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            this.spotifyPlayer.connect();
        } else {
            this.connectToPlayerTimeout = setTimeout(this.connectToPlayer.bind(this), 1000);
        }

    }

    startPlayback = (spotify_uri) => {
        console.log("Playback started")
        if (this.state.device_id === "") {
            setTimeout(() => {
                this.startPlayback();
            }, 1000);
            return;
        }
        if (!this.state.spotifyPlayerReady) {
            return;
        }
        fetch("https://api.spotify.com/v1/me/player/play?" +
            "device_id=" + this.state.spotifyDeviceId, {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
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
    };

    render() {
        return (
            <div>
                <SpotifyAuthWindow />
            </div>
        );
    }

}

export default SpotifyPlayer;
