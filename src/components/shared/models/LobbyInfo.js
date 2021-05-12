import styled from "styled-components";
import User from "./User";
import LobbyScreen from "../../login/InLobbyScreen";





class Lobby{

    constructor(data = {}) {
        this.gameCanStart=null;
        this.name=null;
        this.players=null;
        Object.assign(this, data);
    }
}
export default Lobby;
