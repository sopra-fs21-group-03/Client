import React, {Component} from 'react';
import ReactDOM from "react-dom";

export default class SpotifyAuthWindow extends Component {

    externalWindow;
    containerEl;
    SCOPE_LIST = "streaming user-read-private user-read-currently-playing";

    constructor() {
        super();
        this.containerEl = document.createElement('div');
        this.externalWindow = null;
    }

    componentDidMount() {

        this.externalWindow = window.open("https://accounts.spotify.com/authorize?" +
            "client_id=bbe3c778649648ebb67ea760608f30f2" +
            "&response_type=token" +
            "&redirect_uri=http://localhost:3000/" +
            "&show_dialog=true" +
            "&scope="+this.SCOPE_LIST, '', "width=600, height=500");
    }


    render() {

        return ReactDOM.createPortal(this.props.children, this.containerEl);
    }
}