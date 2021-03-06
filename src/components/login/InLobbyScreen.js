import React from 'react';
import {withRouter} from "react-router-dom";
import styled from "styled-components";
import {LeaveTableButton, Loader, LoadingGameContainer} from "../../views/design/GameScreenStyle";
import {api} from "../../helpers/api";
import LobbyInfo from "../shared/models/LobbyInfo";

const Border = styled.button`
  margin: 10px;
  width: 450px;
  color: white;
  height: 80px;
  margin-left: auto;
  margin-right: auto;
  border: none;
  background: none;
  margin-top: ${props => props.margintop || null}; 
`;

const ReadyBox = styled.div`
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
  padding: 8px;
`;

const IfSelfBox = styled.div`
  width: 80px;
  height: 100%;
  float: right;
  padding: 8px 18px 8px 8px ;
`;

const PlayerName = styled.div`
  color: red;
  width: calc(100% - 80px);
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

const ReadyButton = styled(LeaveTableButton)`
  position: absolute;
  top: 80%;
  left: 4.5%;
  background: rgb(0,0,0,0.8);
  height: 10%;
  width: 30%;
  font-size: 24pt;
  font-weight: 200;
`;

const LeaveLobbyButton = styled(LeaveTableButton)`
  position: absolute;
  top: 80%;
  left: 37.5%;
  background: red;
  height: 10%;
  width: 38%;
  font-size: 24pt;
  font-weight: 200;
  border: none;
  color: black;
`;

const LobbbyScreenBaseContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 70%;
  height: 80%;
  width: 40%;
  top: 55%;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 300px;
  width: 80%;
  height: 100%;
  position: absolute;
  margin-left: 10%;
  border-radius: 5px;
  background-color: rgb(0, 0, 0, 0.8);
  padding-bottom: 100px;
`;


class LobbyScreen extends React.Component{
    constructor() {
        super();
        this.state = {
            lobbies: null
        };
    }

    lobby = new LobbyInfo();
    myselfUser = null;

    async updateLobby(){
        const response = await api.get('/lobbies/' + localStorage.getItem("gameId"), {headers: {Authorization: localStorage.getItem('token')}});
        this.lobby = new LobbyInfo(response.data);
        if(this.lobby.gameCanStart){
            this.props.history.push('/gamescreen');
        }
        if(this.lobby.inGame){
            this.props.history.push('/gamescreen');
        }

        if(this.lobby.players.length > 0){
            if(this.lobby.players[0].username == localStorage.getItem('username')){
                this.myselfUser = this.lobby.players[0];
            }
        }
        if(this.lobby.players.length > 1){
            if(this.lobby.players[1].username == localStorage.getItem('username')){
                this.myselfUser = this.lobby.players[1];
            }
        }
        if(this.lobby.players.length > 2){
            if(this.lobby.players[2].username == localStorage.getItem('username')){
                this.myselfUser = this.lobby.players[2];
            }
        }
        if(this.lobby.players.length > 3){
            if(this.lobby.players[3].username == localStorage.getItem('username')){
                this.myselfUser = this.lobby.players[3];
            }
        }
        if(this.lobby.players.length > 4){
            if(this.lobby.players[4].username == localStorage.getItem('username')){
                this.myselfUser = this.lobby.players[4];
            }
        }
    }

    async componentDidMount() {
        this.interval = setInterval(async () => {
            await this.updateLobby();
            this.setState({time: Date.now()})
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    async ready() {
        await api.put('lobbies/' + localStorage.getItem("gameId") + '/' + localStorage.getItem("userID") + '/ready', this.returnToken())
    }

    async unReady() {
        await api.put('lobbies/' + localStorage.getItem("gameId") + '/' + localStorage.getItem("userID") + '/unready', this.returnToken())
    }

    async leaveLobby() {
        await api.put('lobbies/' + localStorage.getItem("gameId") + '/' + localStorage.getItem("userID") + '/leave', this.returnToken())
        localStorage.removeItem('gameId')
        this.props.history.push('/lobbyscreen')
    }

    returnToken() {
        return JSON.stringify({
            token: localStorage.getItem('token')
        })
    }

    render() {

        if(this.lobby.players != null){ return (
            <LobbbyScreenBaseContainer>
                <FormContainer>
                        <Border margintop = '50px'>
                            {this.lobby.players.length > 0 ? (
                                <ReadyBox>
                                    {this.lobby.players[0].readyStatus == 'READY' ? (
                                        <img className="resize" src="https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/greenplayingcards.png"/>
                                    ) : (
                                        <img className="resize" src="https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/redcards.png"/>
                                    )}
                                </ReadyBox>
                            ) : (
                                <ReadyBox></ReadyBox>
                            )}
                            {this.lobby.players.length > 0 ? (
                                <PlayerName>
                                    {this.lobby.players[0].username}
                                    {this.lobby.players[0].username == localStorage.getItem("username") ? (
                                        <IfSelfBox>
                                            <img className="resize" src="https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/crown.png"/>
                                        </IfSelfBox>
                                    ) : (
                                        <IfSelfBox></IfSelfBox>
                                    )}
                                </PlayerName>) : (
                                <PlayerName>
                                </PlayerName>
                            )}
                        </Border>
                    <Border>
                        {this.lobby.players.length > 1 ? (
                            <ReadyBox>
                                {this.lobby.players[1].readyStatus == 'READY' ? (
                                    <img className="resize" src="https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/greenplayingcards.png"/>
                                ) : (
                                    <img className="resize" src="https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/redcards.png"/>
                                )}
                            </ReadyBox>
                        ) : (
                            <ReadyBox></ReadyBox>
                        )}
                        {this.lobby.players.length > 1 ? (
                            <PlayerName>
                                {this.lobby.players[1].username}
                                {this.lobby.players[1].username == localStorage.getItem("username") ? (
                                    <IfSelfBox>
                                        <img className="resize" src="https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/crown.png"/>
                                    </IfSelfBox>
                                ) : (
                                    <IfSelfBox></IfSelfBox>
                                )}
                            </PlayerName>) : (
                            <PlayerName>
                            </PlayerName>
                        )}
                    </Border>
                    <Border>
                        {this.lobby.players.length > 2 ? (
                            <ReadyBox>
                                {this.lobby.players[2].readyStatus == 'READY' ? (
                                    <img className="resize" src="https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/greenplayingcards.png"/>
                                ) : (
                                    <img className="resize" src="https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/redcards.png"/>
                                )}
                            </ReadyBox>
                        ) : (
                            <ReadyBox></ReadyBox>
                        )}
                        {this.lobby.players.length > 2 ? (
                            <PlayerName>
                                {this.lobby.players[2].username}
                                {this.lobby.players[2].username == localStorage.getItem("username") ? (
                                    <IfSelfBox>
                                        <img className="resize" src="https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/crown.png"/>
                                    </IfSelfBox>
                                ) : (
                                    <IfSelfBox></IfSelfBox>
                                )}
                            </PlayerName>) : (
                            <PlayerName>
                            </PlayerName>
                        )}
                    </Border>
                    <Border>
                        {this.lobby.players.length > 3 ? (
                            <ReadyBox>
                                {this.lobby.players[3].readyStatus == 'READY' ? (
                                    <img className="resize" src="https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/greenplayingcards.png"/>
                                ) : (
                                    <img className="resize" src="https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/redcards.png"/>
                                )}
                            </ReadyBox>
                        ) : (
                            <ReadyBox></ReadyBox>
                        )}
                        {this.lobby.players.length > 3 ? (
                            <PlayerName>
                                {this.lobby.players[3].username}
                                {this.lobby.players[3].username == localStorage.getItem("username") ? (
                                    <IfSelfBox>
                                        <img className="resize" src="https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/crown.png"/>
                                    </IfSelfBox>
                                ) : (
                                    <IfSelfBox></IfSelfBox>
                                )}
                            </PlayerName>) : (
                            <PlayerName>
                            </PlayerName>
                        )}
                    </Border>
                    <Border>
                        {this.lobby.players.length > 4 ? (
                            <ReadyBox>
                                {this.lobby.players[4].readyStatus == 'READY' ? (
                                    <img className="resize" src="https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/greenplayingcards.png"/>
                                ) : (
                                    <img className="resize" src="https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/redcards.png"/>
                                )}
                            </ReadyBox>
                        ) : (
                            <ReadyBox></ReadyBox>
                        )}
                        {this.lobby.players.length > 4 ? (
                            <PlayerName>
                                {this.lobby.players[4].username}
                                {this.lobby.players[4].username == localStorage.getItem("username") ? (
                                    <IfSelfBox>
                                        <img className="resize" src="https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/crown.png"/>
                                    </IfSelfBox>
                                ) : (
                                    <IfSelfBox></IfSelfBox>
                                )}
                            </PlayerName>) : (
                            <PlayerName>
                            </PlayerName>
                        )}
                    </Border>
                    {this.myselfUser.readyStatus == "NOTREADY" ? (
                        <ReadyButton
                            onClick={() => {
                                this.ready()
                            }}>
                            Ready
                        </ReadyButton>
                    ) : (
                        <ReadyButton
                            onClick={() => {
                                this.unReady()
                            }}>
                            Unready
                        </ReadyButton>
                    )}
                    <LeaveLobbyButton
                        onClick={() => {
                        this.leaveLobby()
                    }}>
                        Leave Lobby
                    </LeaveLobbyButton>
                </FormContainer>
            </LobbbyScreenBaseContainer>)}
        else{
            return(
                <LoadingGameContainer> LOADING <Loader top='360px' left='57%'>500</Loader></LoadingGameContainer>
            )
        }
       }
}
export default withRouter(LobbyScreen);