import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { RedButton } from '../../views/design/RedButton';
import { withRouter } from 'react-router-dom';
import User from '../shared/models/User';
import Card from "../shared/models/Card";
import Deck from "../shared/models/Deck";
import {BlackButton} from "../../views/design/BlackButton";

document.body.style.backgroundColor = "green";

const LeaveTableButton = styled(BlackButton)`
  position: absolute;
  top: 60%;
  left: 25%;
  background: rgb(0,0,0,0.8);
  height: 25%;
  width: 60%;
  font-size: 24pt;
  font-weight: 200;
`;

const CheckButton = styled(RedButton)`
  &:hover {
    transform: translateY(0px);
    background: white;
    border: solid 3px;
    border-color: red;
    color: red;
  }
  transition: all 2s ease;
  position: absolute;
  width: 80%;
  left: 10%;
  top: 8%;
  color: white;
`;

const CallButton = styled(RedButton)`
  &:hover {
    transform: translateY(0px);
    background: white;
    border: solid 3px;
    border-color: red;
    color: red;
  }
  transition: all 2s ease;
  position: absolute;
  width: 80%;
  left: 10%;
  top: 25%;
  color: white;
`;

const RaiseButton = styled(RedButton)`
  &:hover {
    transform: translateY(0px);
    background: white;
    border: solid 3px;
    border-color: red;
    color: red;
  }
  transition: all 2s ease;
  position: absolute;
  width: 80%;
  left: 10%;
  top: 25%;
  color: white;
`;

const FoldButton = styled(RedButton)`
  &:hover {
    transform: translateY(0px);
    background: white;
    border: solid 3px;
    border-color: red;
    color: red;
  }
  transition: all 2s ease;
  position: absolute;
  width: 80%;
  left: 10%;
  top: 8%;
  color: white;
`;

const InnerTextChatContainer = styled.div`
  background: rgb(0,0,0,0.7);
  margin: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 95%;
  height: 100%;
  margin-left: auto;
  padding: 15px;
  margin-right: auto;
  border-radius: 10px;
`;

const TextBacklogChatContainer = styled.div`
  margin: 0;
  margin-top:5px;
  position: absolute;
  left: 50%;
  top: 42.5%;
  transform: translate(-50%, -50%);
  width: 98%;
  height: 85%;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
  margin-right: auto;
  overflow: auto;
  color: white;
  word-wrap:break-word;
`;

const ChatInputField = styled.input`
  &::placeholder {
    color: rgba(0, 0, 0, 0.8);
  }
  width: 90%;
  height: 10%;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 10px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255);
  position: absolute;
  top: 87.5%;
`;

const Tablesquare = styled.div`
background-color: green;
  margin: 0;
  position: absolute;
  left: 50%;
  top: 40%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 65%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
  border-top: solid;
  border-bottom: solid;
  border-color: brown;
  border-width: 15px;
`;

const TableCircleLeft = styled.span`
background-color: green;
  margin: 0;
  position: absolute;
  left: 20%;
  top: 40%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  height: 65%;
  width: 20%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
  border-top: solid;
  border-bottom: solid;
  border-left: solid;
  border-color: brown;
  border-width: 15px;
  border-radius: 50%;
`;

const TableCircleRight = styled.span`
background-color: green;
  margin: 0;
  position: absolute;
  left: 80%;
  top: 40%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  height: 65%;
  width: 20%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
  border-right: solid;
  border-top: solid;
  border-bottom: solid;
  border-color: brown;
  border-width: 15px;
  border-radius: 50%;
`;

const GameContainer = styled.div`
  background-color: rgb(169,170,172);
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
  max-width: 100%;
`;

const UpperContainer = styled.div`
border: dotted;
  margin: 0;
  position: absolute;
  left: 50%;
  top: 10%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 20%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

const MiddleContainer = styled.div`
border: dotted;
  margin: 0;
  position: absolute;
  left: 50%;
  top: 40%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 40%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

const LowerContainer = styled.div`
border: dotted;
  margin: 0;
  position: absolute;
  top: 75%;
  left: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 30%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

const BottomContainer = styled.div`
background-color: black;
  margin: 0;
  position: absolute;
  top: 95%;
  left: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 10%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

const ChatContainer = styled.div`
  margin: 0;
  position: absolute;
  left: 12.5%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 25%;
  height: 100%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

const LeaveTableContainer = styled.div`
  margin: 0;
  position: absolute;
  left: 87.5%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 25%;
  height: 100%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

const CheckContainer = styled.div`
border: dotted;
  margin: 0;
  position: absolute;
  left: 31.25%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 12.5%;
  height: 100%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

const FoldContainer = styled.div`
border: dotted;
  margin: 0;
  position: absolute;
  left: 68.75%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 12.5%;
  height: 100%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

const OwnCardsContainer = styled.div`
border: dotted;
  margin: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 25%;
  height: 100%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

const PlayerLeftContainer = styled.div`
border: dotted;
  margin: 0;
  position: absolute;
  left: 10%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 20%;
  height: 100%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

const PlayerRightContainer = styled.div`
border: dotted;
  margin: 0;
  position: absolute;
  left: 90%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 20%;
  height: 100%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

const TableComponentsContainer = styled.div`
border: dotted;
  margin: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 100%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

const TotalPotContainer = styled.div`
border: dotted;
  margin: 0;
  position: absolute;
  left: 50%;
  top: 10%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 20%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

const MiddleCardsContainer = styled.div`
border: dotted;
  margin: 0;
  position: absolute;
  left: 50%;
  top: 45%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 50%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

const CallContainer = styled.div`
border: dotted;
  margin: 0;
  position: absolute;
  left: 25%;
  top: 85%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 30%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

const RaiseContainer = styled.div`
border: dotted;
  margin: 0;
  position: absolute;
  left: 75%;
  top: 85%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 30%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

const TopLeftPlayerContainer = styled.div`
border: dotted;
  margin: 0;
  position: absolute;
  left: 25%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 100%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

const TopRightPlayerContainer = styled.div`
border: dotted;
  margin: 0;
  position: absolute;
  left: 75%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 100%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

const CardBox = styled.div`
  background-color: white;
  margin: 0;
  position: absolute;
  left: 75%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 35px;
  height: 50px;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

class GameScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null
        };
    }

    logout() {
        localStorage.removeItem('token');
        this.props.history.push('/login');
    }

    deck = new Deck();


    returnCard(cardNumber, Suit){
    const card = new Card({cardNumber: cardNumber, suit: Suit});
    return card.card}

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 200);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }


    render() {
        //not turn
        if(2==3){
            return (
                <GameContainer>
                    <TableCircleLeft></TableCircleLeft>
                    <TableCircleRight></TableCircleRight>
                    <Tablesquare></Tablesquare>
                    <UpperContainer>
                        <TopLeftPlayerContainer>Top Left Player

                        </TopLeftPlayerContainer>
                        <TopRightPlayerContainer>Top Right Player</TopRightPlayerContainer>
                    </UpperContainer>
                    <MiddleContainer>
                        <PlayerLeftContainer>{this.returnCard("TEN","CLUBS")}</PlayerLeftContainer>
                        <TableComponentsContainer>
                            <TotalPotContainer>Total Pot</TotalPotContainer>
                            <MiddleCardsContainer>Middle Cards</MiddleCardsContainer>
                            <CallContainer>Call Button</CallContainer>
                            <RaiseContainer>Raise Button</RaiseContainer>
                        </TableComponentsContainer>
                        <PlayerRightContainer>{this.returnCard("TWO","HEART")}</PlayerRightContainer>
                    </MiddleContainer>
                    <LowerContainer>
                        <ChatContainer>Chat</ChatContainer>
                        <CheckContainer>CheckButton</CheckContainer>
                        <OwnCardsContainer>{this.returnCard("ACE","DIAMOND")}</OwnCardsContainer>
                        <FoldContainer>FoldButton</FoldContainer>
                        <LeaveTableContainer>Leave Tabel Button
                            <LeaveTableButton
                                width="60%"
                                onClick={() => {
                                    this.logout();
                                }}
                            >
                                Leave Table
                            </LeaveTableButton>
                        </LeaveTableContainer>
                    </LowerContainer>
                    <BottomContainer>
                    </BottomContainer>
                </GameContainer>);
        }

        //turn
        if(2==2) {
            return (
                <GameContainer>
                    <TableCircleLeft></TableCircleLeft>
                    <TableCircleRight></TableCircleRight>
                    <Tablesquare></Tablesquare>
                    <UpperContainer>
                        <TopLeftPlayerContainer>Top Left Player

                        </TopLeftPlayerContainer>
                        <TopRightPlayerContainer>Top Right Player</TopRightPlayerContainer>
                    </UpperContainer>
                    <MiddleContainer>
                        <PlayerLeftContainer>{this.returnCard("TEN","CLUBS")}</PlayerLeftContainer>
                        <TableComponentsContainer>
                            <TotalPotContainer>Total Pot</TotalPotContainer>
                            <MiddleCardsContainer>Middle Cards</MiddleCardsContainer>
                            <CallContainer>
                                <CallButton>Call</CallButton>
                            </CallContainer>
                            <RaiseContainer>
                                <RaiseButton>Raise</RaiseButton>
                            </RaiseContainer>
                        </TableComponentsContainer>
                        <PlayerRightContainer>{this.returnCard("TWO","HEART")}</PlayerRightContainer>
                    </MiddleContainer>
                    <LowerContainer>
                        <ChatContainer>
                            <InnerTextChatContainer>
                                <TextBacklogChatContainer>
                                    <p>hissssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                                    <p>hi</p>
                                    <p>hi</p>
                                    <p>hi</p>
                                    <p>hi</p>
                                    <p>hi</p>
                                    <p>hi</p>
                                    <p>hi</p>
                                    <p>hi</p>
                                    <p>hi</p>
                                    <p>hi</p>
                                    <p>hi</p>
                                    <p>hi</p>
                                    <p>hi</p>
                                    <p>hi</p>
                                    <p>hi</p>
                                    <p>hi</p>
                                    <p>hi</p>
                                </TextBacklogChatContainer>
                                <ChatInputField placeholder = "Type in your message"></ChatInputField>
                            </InnerTextChatContainer>
                        </ChatContainer>
                        <CheckContainer>
                            <CheckButton>Check</CheckButton>
                        </CheckContainer>
                        <OwnCardsContainer>{this.returnCard("ACE","DIAMOND")}</OwnCardsContainer>
                        <FoldContainer>
                            <FoldButton>Fold</FoldButton>
                        </FoldContainer>
                        <LeaveTableContainer>Leave Tabel Button
                            <LeaveTableButton
                            onClick={() => {
                                this.logout();
                            }}
                            >
                            Leave Table
                            </LeaveTableButton>
                        </LeaveTableContainer>
                    </LowerContainer>
                    <BottomContainer>
                    </BottomContainer>
                </GameContainer>);
        }
        //showdown
        else{
            return (
                <GameContainer>
                    <TableCircleLeft></TableCircleLeft>
                    <TableCircleRight></TableCircleRight>
                    <Tablesquare></Tablesquare>
                    <UpperContainer>
                        <TopLeftPlayerContainer>Top Left Player</TopLeftPlayerContainer>
                        <TopRightPlayerContainer>Top Right Player</TopRightPlayerContainer>
                    </UpperContainer>
                    <MiddleContainer>
                        <PlayerLeftContainer>Left Player</PlayerLeftContainer>
                        <TableComponentsContainer>
                            <TotalPotContainer>Total Pot</TotalPotContainer>
                            <MiddleCardsContainer>Middle Cards</MiddleCardsContainer>
                            <CallContainer>Call Button</CallContainer>
                            <RaiseContainer>Raise Button</RaiseContainer>
                        </TableComponentsContainer>
                        <PlayerRightContainer>Right Player</PlayerRightContainer>
                    </MiddleContainer>
                    <LowerContainer>
                        <ChatContainer>Chat</ChatContainer>
                        <CheckContainer>CheckButton</CheckContainer>
                        <OwnCardsContainer>Own Cards</OwnCardsContainer>
                        <FoldContainer>FoldButton</FoldContainer>
                        <LeaveTableContainer>Leave Tabel Button</LeaveTableContainer>
                    </LowerContainer>
                    <BottomContainer>
                    </BottomContainer>
                </GameContainer>);
        }
    }
}

export default withRouter(GameScreen);
