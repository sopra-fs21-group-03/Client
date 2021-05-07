import styled from "styled-components";
import User from "./User";

const Border = styled.button`
  margin: 10px;
  width: 450px;
  color: white;
  height: 80px;
  margin-left: auto;
  margin-right: auto;
  border: none;
  background: none;
`;

const LobbyNumber = styled.div`
  background: white;
  color: red;
  width: 80px;
  height: 80px;
  left: 20%;
  background: white;
  float: left;
  border-top: 2px solid white;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  border-radius: 5px 0 0 5px;
  font-size: 32pt;
  line-height: 70px;
  text-align: center;
`;

const LobbyInfo = styled.div`
  color: red;
  width: 358px;
  height: 80px;
  background: black; 
  float: right;
  border-radius: 0 5px 5px 0;
  border-top: 2px solid white;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  color: white;
  line-height: 70px;
  text-align: left;
  padding-left: 15px;
  font-size: 16pt;
`;

const LobbyPlayerCount = styled.div`
  color: red;
  float: right;
  padding-right: 25px;
  font-size: 12pt;
  line-height: 75px;
`;



class Lobby{

    constructor(data = {}) {
        this.name=null;
        this.playerCount=null;
        this.inGame=null;
        this.lobbyID=null;
        Object.assign(this, data);
    }
    getLobby(){
        return(
                <Border onClick={() => {
                    localStorage.setItem("gameId", this.lobbyID);
                }}>
                    <LobbyNumber>{this.lobbyID}</LobbyNumber>
                    <LobbyInfo>
                        {this.name}
                        <LobbyPlayerCount>{this.playerCount+"/5 Players"}</LobbyPlayerCount>
                    </LobbyInfo>
                </Border>
            )
    }

}
export default Lobby;
