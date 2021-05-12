import styled from "styled-components";
import User from "./User";
import LobbyScreen from "../../login/InLobbyScreen";





class Lobby{

    constructor(data = {}) {
        this.name=null;
        this.playerCount=null;
        this.inGame=null;
        this.id=null;
        Object.assign(this, data);
    }
}
export default Lobby;
