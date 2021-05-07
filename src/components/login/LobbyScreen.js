import React from 'react';
import {withRouter} from "react-router-dom";
import {BaseContainer} from "../../helpers/layout";
import styled from "styled-components";
import Lobby from "../shared/models/Lobby";

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
  width: 45%;
  height: 100%;
  margin-left: 25%;
  position: absolute;
`;


const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background-color: rgb(0, 0, 0, 0.92);
  transition: opacity 0.5s ease, transform 0.5s ease;
`;


class LobbyScreen extends React.Component{
    testLobby=[new Lobby({"name":"test","playerCount":4,"inGame":false, "lobbyID":1}),new Lobby({"name":"TEST","playerCount":4,"inGame":false, "lobbyID":1})]

    render() {
        return (
            <BaseContainer>

                <FormContainer>
                    <Form onClick={() => {
                        this.props.history.push(`/gamescreen`);
                    }}>
                        {this.testLobby.map((lobby) => new Lobby(lobby).getLobby())}
                    </Form>
                </FormContainer>
            </BaseContainer>)}
}
export default withRouter(LobbyScreen);