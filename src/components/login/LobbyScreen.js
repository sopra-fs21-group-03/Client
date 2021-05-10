import React from 'react';
import {withRouter} from "react-router-dom";
import {BaseContainer} from "../../helpers/layout";
import styled from "styled-components";
import Lobby from "../shared/models/Lobby";
import {LeaveTableButton, Loader, LoadingGameContainer} from "../../views/design/GameScreenStyle";
import {api} from "../../helpers/api";

const LogoutButton = styled(LeaveTableButton)`
  position: absolute;
  top: 85%;
  left: 25%;
  background: rgb(0,0,0,0.8);
  height: 10%;
  width: 30%;
  font-size: 24pt;
  font-weight: 200;
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

    async componentDidMount(){
        const response = await api.get('/lobbies');

        this.setState({ lobbies: response.data });

        console.log(this.state.lobbies);
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        this.props.history.push('/login');
    }

    testLobby=[new Lobby({"name":"test","playerCount":4,"inGame":false, "lobbyID":1}),new Lobby({"name":"TEST","playerCount":4,"inGame":false, "lobbyID":1}),new Lobby({"name":"TEST2","playerCount":4,"inGame":false, "lobbyID":1}),new Lobby({"name":"TEST3","playerCount":4,"inGame":false, "lobbyID":1})]

    render() {
        if(this.state.lobbies != null){ return (
            <LobbbyScreenBaseContainer>
                <FormContainer>
                    <Form onClick={() => {
                        this.props.history.push(`/gamescreen`);
                    }}>
                        {this.state.lobbies.map((lobby) => new Lobby(lobby).getLobby())}
                    </Form>
                    <LogoutButton onClick={() => {
                        this.logout()
                    }}>
                        Logout
                    </LogoutButton>
                    <PokerInstructionsButton onClick={() => {
                        this.logout()
                    }}>
                        Poker Instructions
                    </PokerInstructionsButton>
                </FormContainer>
            </LobbbyScreenBaseContainer>)}
        else{
            return(
                <LoadingGameContainer> LOADING <Loader top='360px' left='77%'>500</Loader></LoadingGameContainer>
            )
        }

       }
}
export default withRouter(LobbyScreen);