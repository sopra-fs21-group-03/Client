import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { isProduction } from "../../helpers/isProduction"

export default class SpotifyAuthWindow extends Component {

    redirectURI = isProduction() ? "https://sopra-fs21-group-03-client.herokuapp.com/" : "http://localhost:3000/"

    externalWindow;
    containerEl;
    SCOPE_LIST = "streaming user-read-email user-read-private user-read-currently-playing user-modify-playback-state" 

    constructor() {
        super();
        this.containerEl = document.createElement('div');
        this.externalWindow = null;
    }

    componentDidMount() {
        setTimeout(() => {
            this.externalWindow = window.open("https://accounts.spotify.com/authorize?" +
                "client_id=bbe3c778649648ebb67ea760608f30f2" +
                "&response_type=token" +
                "&redirect_uri=" + this.redirectURI +
                "&show_dialog=true" +
                "&scope="+this.SCOPE_LIST, '', "width=600, height=500");
        }, 1000)
    }


    render() {

        return ReactDOM.createPortal(this.props.children, this.containerEl);
    }
}