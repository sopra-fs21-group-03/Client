import styled from "styled-components";
import User from "./User";


const LobbyContainer=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Border = styled.button`
  margin: 10px;
  width: 400px;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  border: 2px solid;
  border-color: white;
  background-color: black;
  color: green;

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
        return(<LobbyContainer >
                <Border onClick={() => {
                    localStorage.setItem("gameId", this.lobbyID);
                }}>
                {this.name+" : "+this.playerCount+"/5"}
                </Border>
            </LobbyContainer>

        )
    }

}
export default Lobby;
