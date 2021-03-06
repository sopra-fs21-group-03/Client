import React from 'react';
import {withRouter} from "react-router-dom";
import styled from "styled-components";
import {LeaveTableButton, Loader, LoadingGameContainer} from "../../views/design/GameScreenStyle";
import {api, handleError} from "../../helpers/api";

const Border = styled.button`
  margin: 10px;
  width: 450px;
  color: white;
  height: 80px;
  margin-left: auto;
  margin-right: auto;
  border: none;
  background: none;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
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

const LobbyPlayerCount = styled.div`
  color: red;
  float: right;
  padding-right: 25px;
  font-size: 12pt;
  line-height: 75px;
`;

const LogoutButton = styled(LeaveTableButton)`
  position: absolute;
  top: 85%;
  left: 25%;
  background: red;
  height: 10%;
  width: 30%;
  font-size: 24pt;
  font-weight: 200;
  border: none;
  color: black;
`;

const PokerInstructionsButton = styled(LeaveTableButton)`
  position: absolute;
  top: 70%;
  left: 10%;
  background: rgb(0,0,0,0.8);
  height: 10%;
  width: 60%;
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


const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 80%;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  transition: opacity 0.5s ease, transform 0.5s ease;
`;


class LobbyScreen extends React.Component{
    constructor() {
        super();
        this.state = {
            lobbies: null
        };
    }

    returnToken() {
        return  JSON.stringify({
            token: localStorage.getItem('token')
        })
    }

    async joinLobby(lobbyId){
        try{
            await api.put('/lobbies/' + localStorage.getItem("gameId") + '/join', this.returnToken());
            this.props.history.push(`/lobby`);
        } catch (e){
            alert(`Something went wrong. Probably you are in another lobby \n${handleError(e)}`);
        }
    }

    logout() {
        localStorage.clear();
        this.props.history.push('/login');
    }

    async updateLobbyScreen(){
        const response = await api.get('/lobbies', {headers: {Authorization: localStorage.getItem('token')}});

        this.setState({ lobbies: response.data });
    }

    async componentDidMount() {
        this.interval = setInterval(async () => {
            await this.updateLobbyScreen();
            this.setState({time: Date.now()})
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        if(this.state.lobbies != null){ return (
            <LobbbyScreenBaseContainer>
                <FormContainer>
                    <Form>
                        {this.state.lobbies.map(lobby => {return(
                            <Border
                                onClick={() => {
                                try{
                                    localStorage.setItem("gameId", lobby.id);
                                    this.joinLobby(lobby.id);
                                }catch (e){
                                    alert(`Something went wrong. Probably you are in another lobby \n${handleError(e)}`);
                                    localStorage.removeItem('gameId')
                                }
                            }}>
                                <LobbyNumber>{lobby.id}</LobbyNumber>
                                <LobbyInfo>
                                    {lobby.name}
                                    {lobby.inGame ? (
                                        <LobbyPlayerCount>In Game</LobbyPlayerCount>
                                    ) : (
                                        <LobbyPlayerCount>{lobby.playerCount+"/5 Players"}</LobbyPlayerCount>
                                    )}
                                </LobbyInfo>
                            </Border>
                        );})}
                    </Form>
                    <LogoutButton onClick={() => {
                        this.logout()
                    }}>
                        Logout
                    </LogoutButton>
                    <PokerInstructionsButton onClick={() => {
                        this.props.history.push(`/pokerInstructionsScreen`);
                    }}>
                        Poker Instructions
                    </PokerInstructionsButton>
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