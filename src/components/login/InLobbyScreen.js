import React from 'react';
import {withRouter} from "react-router-dom";
import {BaseContainer} from "../../helpers/layout";
import styled from "styled-components";
import Lobby from "../shared/models/Lobby";
import {LeaveTableButton, Loader, LoadingGameContainer} from "../../views/design/GameScreenStyle";
import {api} from "../../helpers/api";
import User from "../shared/models/User";
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
  background: white;
  float: right;
  padding: 8px;
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
  left: 25%;
  background: rgb(0,0,0,0.8);
  height: 10%;
  width: 30%;
  font-size: 24pt;
  font-weight: 200;
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

    async updateLobby(){
        const response = await api.get('/lobbies/' + localStorage.getItem("gameId"), {headers: {Authorization: localStorage.getItem('token')}});
        this.lobby = new LobbyInfo(response.data);
        console.log(this.lobby.gameCanStart);
        if(this.lobby.gameCanStart){
            this.props.history.push('/gamescreen');
        }
        //this.setState({ lobbies: response.data });
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

    returnToken() {
        const requestBody = JSON.stringify({
            token: localStorage.getItem('token')
        });
        return requestBody
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
                                    <IfSelfBox></IfSelfBox>
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
                            </PlayerName>) : (
                            <PlayerName>
                            </PlayerName>
                        )}
                    </Border>
                    <ReadyButton onClick={() => {
                        this.ready()
                    }}>
                        Ready
                    </ReadyButton>

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