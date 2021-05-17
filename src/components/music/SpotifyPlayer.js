import React, { Component } from 'react';
import { ScriptCache } from "./ScriptCache";
import SpotifyAuthWindow from "./SpotifyAuthWindow"

class SpotifyPlayer extends Component {

    constructor() {
        super();

        this.state = {
            spotifyAccessToken: "",
            spotifyDeviceId: "",
            spotifyAccess: false,
            spotifyPlayer: undefined,
            spotifyPlayerReady: false
        };

        new ScriptCache([
            {
                name: "https://sdk.scdn.co/spotify-player.js",
                callback: this.spotifySDKCallback
            }]);

        window.addEventListener("storage", this.authorizeSpotifyFromStorage);

    }

    spotifySDKCallback = () => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            if (this.state.spotifyAccess === true) {
                const spotifyPlayer = new SpotifyPlayer(
                    "SoPra Poker",
                    cb => {
                        cb(this.state.spotifyAccessToken)
                    }
                )

                this.setState({
                    spotifyPlayer: spotifyPlayer
                });
                console.log(this.spotifyPlayer);
            }
        }
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
                this.connectToPlayer();
            }
        }
    }

    connectToPlayer = async () => {
        if (this.state.spotifyPlayer) {
            clearTimeout(this.connectToPlayerTimeout);

            // Ready
            this.state.spotifyPlayer.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                this.setState({
                    loadingState: "spotify player ready",
                    spotifyDeviceId: device_id,
                    spotifyPlayerReady: true
                });
            });

            // Not Ready
            this.state.spotifyPlayer.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            this.state.spotifyPlayer.connect();
            this.startPlayback();
        } else {
            this.connectToPlayerTimeout = setTimeout(this.connectToPlayer.bind(this), 1000);
        }

    }

    startPlayback = (spotify_uri) => {
        if(!this.state.spotifyPlayerReady) {
            alert("player not ready")
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
