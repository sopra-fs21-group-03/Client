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
import Game from "../shared/models/Game";

document.body.style.backgroundColor = "green";

const Writen =styled.p`
    margin-top: 0;
    margin-bottom: 2px;
    padding-top: 0;
    padding-bottom: 0;
`;

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
  width: 50%;
  left: 10%;
  top: 25%;
  color: white;
  border-radius: 10px 0 0 10px;
`;

const RaiseInput = styled.input`
  transition: all 2s ease;
  position: absolute;
  width: 30%;
  left: 60%;
  top: 25%;
  color: red;
  height: 50px;
  border-radius: 0 10px 10px 0;
  border: solid red;
  type: number;
  padding-left: 15px;
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
  margin: 0;
  position: absolute;
  left: 50%;
  top: 10%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 25%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

const MiddleContainer = styled.div`
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

const PlayerCardsContainer = styled.div`
  margin: 0;
  position: absolute;
  top: ${props => props.top || null};
  left: ${props => props.left || null};
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: ${props => props.width || null};
  height: ${props => props.height || null};
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

const TableComponentsContainer = styled.div`
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
  background: rgb(0,0,0,0.7);
  border-radius: 15px;
  margin: 0;
  position: absolute;
  left: 45%;
  top: 15%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 12%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
  text-align: center;
  font-size: 24pt;
  color: red;
`;

const MiddleCardsContainer = styled.div`
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
  border: solid;
  border-color: white;
  background-color: red;
  margin: 0;
  position: absolute;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: ${props => props.width || null};
  height: ${props => props.height || null};
  top: ${props => props.top || null};
  left: ${props => props.left || null};
  margin-left: auto;
  padding-left: auto;
  margin-right: auto;
  padding-right: auto;
  transform: ${props => props.transform || null};
  display: ${props => props.display || null}; 
`;

const PlayerInfoContainer = styled.div`
  width: ${props => props.width || null};
  height: ${props => props.height || null};
  top: ${props => props.top || null};
  left: ${props => props.left || null};
  margin: 0;
  position: absolute;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  margin-left: auto;
  margin-right: auto;
  padding-left: 5px;
  font-size: 18pt;
  color: ${props => props.color || null};
  padding-top: 10px;
  overflow: auto;
  word-wrap:break-word;
`;

const FrontCardBox = styled.div`
  width: 100%;
  height: 100%;
  display: ${props => props.display || null};  
`;


class GameScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null
        };
    }



    game=new Game({name:"GameName",opponents:[new User({cards:[new Card({cardNumber:"ACE", suit:"DIAMOND"}),new Card({cardNumber:"TWO", suit:"DIAMOND"})]}),new User({cards:[new Card({cardNumber:"ACE", suit:"SPADES"}),new Card({cardNumber:"TWO", suit:"SPADES"})]})]});
    user1=new User(this.game.opponents[0])
    user2=new User(this.game.opponents[1])




    logout() {
        localStorage.removeItem('token');
        this.props.history.push('/login');
    }



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
        if(2==2){
            return (
                <GameContainer>
                    <TableCircleLeft></TableCircleLeft>
                    <TableCircleRight></TableCircleRight>
                    <Tablesquare></Tablesquare>
                    <UpperContainer>
                        <TopLeftPlayerContainer>
                            <PlayerInfoContainer
                                top="25%"
                                left="70%"
                                width="60%"
                                height="30%"
                                color="black">
                                Hacker Money: 20.000
                            </PlayerInfoContainer>
                            <PlayerCardsContainer
                                top="72.5%"
                                left="60%"
                                width="30%"
                                height="55%">
                                <CardBox
                                    width="30%"
                                    top="0"
                                    left="29%"
                                    height="100%"
                                    transform="rotate(180deg)">
                                    <FrontCardBox>{this.user1.cards[0].card}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="30%"
                                    top="0"
                                    left="61%"
                                    height="100%"
                                    transform="rotate(180deg)">
                                    <FrontCardBox>{this.user1.cards[1].card}</FrontCardBox>
                                </CardBox>
                            </PlayerCardsContainer>
                        </TopLeftPlayerContainer>
                        <TopRightPlayerContainer>
                            <PlayerInfoContainer
                                top="25%"
                                left="40%"
                                width="60%"
                                height="30%"
                                color="black">
                                Stanley Money: 20.000
                            </PlayerInfoContainer>
                            <PlayerCardsContainer
                                top="72.5%"
                                left="20%"
                                width="30%"
                                height="55%">
                                <CardBox
                                    width="30%"
                                    top="0"
                                    left="29%"
                                    height="100%"
                                    transform="rotate(180deg)">
                                    <FrontCardBox>{this.user2.cards[0].card}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="30%"
                                    top="0"
                                    left="61%"
                                    height="100%"
                                    transform="rotate(180deg)">
                                    <FrontCardBox>{this.user2.cards[1].card}</FrontCardBox>
                                </CardBox>
                            </PlayerCardsContainer>
                        </TopRightPlayerContainer>
                    </UpperContainer>
                    <MiddleContainer>
                        <PlayerLeftContainer>
                            <PlayerInfoContainer
                                top="45%"
                                left="25%"
                                width="50%"
                                height="60%"
                                color="black">
                                PokerNoob Money: 20.000
                            </PlayerInfoContainer>
                            <PlayerCardsContainer
                                top="50%"
                                left="78%"
                                width="40%"
                                height="50%">
                                <CardBox
                                    width="60%"
                                    height="80%"
                                    top="-15%"
                                    left="20%"
                                    transform="rotate(90deg)">
                                    <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="60%"
                                    height="80%"
                                    top="35%"
                                    left="20%"
                                    transform="rotate(90deg)">
                                    <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                                </CardBox>
                            </PlayerCardsContainer>
                        </PlayerLeftContainer>
                        <TableComponentsContainer>
                            <TotalPotContainer>Total Pot: 20.000</TotalPotContainer>
                            <MiddleCardsContainer>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="68%">
                                    <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="58%">
                                    <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="48%">
                                    <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="38%">
                                    <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="28%">
                                    <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="80%">
                                </CardBox>
                            </MiddleCardsContainer>
                            <CallContainer>
                            </CallContainer>
                            <RaiseContainer>
                            </RaiseContainer>
                        </TableComponentsContainer>
                        <PlayerRightContainer>
                            <PlayerInfoContainer
                                top="45%"
                                left="75%"
                                width="50%"
                                height="60%"
                                color="black">
                                BestPokerPlayerEUWest Money: 20.000
                            </PlayerInfoContainer>
                            <PlayerCardsContainer
                                top="50%"
                                left="22%"
                                width="40%"
                                height="50%">
                                <CardBox
                                    width="60%"
                                    height="80%"
                                    top="-15%"
                                    left="20%"
                                    transform="rotate(270deg)">
                                    <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="60%"
                                    height="80%"
                                    top="35%"
                                    left="20%"
                                    transform="rotate(270deg)">
                                    <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                                </CardBox>
                            </PlayerCardsContainer>
                        </PlayerRightContainer>
                    </MiddleContainer>
                    <LowerContainer>
                        <ChatContainer>
                            <InnerTextChatContainer>
                                <TextBacklogChatContainer>
                                    <Writen>BestPokerPlayerEUWest: Hello Guys</Writen>
                                    <Writen>Hacker: hi</Writen>
                                    <Writen>Stanley: EZ</Writen>
                                </TextBacklogChatContainer>
                                <ChatInputField placeholder = "Type in your message"></ChatInputField>
                            </InnerTextChatContainer>
                        </ChatContainer>
                        <CheckContainer>
                        </CheckContainer>
                        <OwnCardsContainer>
                            <CardBox
                                width="35%"
                                height="80%"
                                top="50%"
                                left="28%">
                                <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                            </CardBox>
                            <CardBox
                                width="35%"
                                height="80%"
                                top="50%"
                                left="72%">
                                <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                            </CardBox>
                        </OwnCardsContainer>
                        <FoldContainer>
                        </FoldContainer>
                        <LeaveTableContainer>
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
                        <PlayerInfoContainer
                            top="50%"
                            left="50%"
                            width="30%"
                            height="60%"
                            color="white">
                            MySelf Money: 20.000
                        </PlayerInfoContainer>
                    </BottomContainer>
                </GameContainer>);
        }

        //turn
        if(2==3) {
            return (
                <GameContainer>
                    <TableCircleLeft></TableCircleLeft>
                    <TableCircleRight></TableCircleRight>
                    <Tablesquare></Tablesquare>
                    <UpperContainer>
                        <TopLeftPlayerContainer>
                            <PlayerInfoContainer
                                top="25%"
                                left="70%"
                                width="60%"
                                height="30%"
                                color="black">
                                Hacker Money: 20.000
                            </PlayerInfoContainer>
                            <PlayerCardsContainer
                                top="72.5%"
                                left="60%"
                                width="30%"
                                height="55%">
                                <CardBox
                                    width="30%"
                                    top="0"
                                    left="29%"
                                    height="100%"
                                    transform="rotate(180deg)">
                                    <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="30%"
                                    top="0"
                                    left="61%"
                                    height="100%"
                                    transform="rotate(180deg)">
                                    <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                                </CardBox>
                            </PlayerCardsContainer>
                        </TopLeftPlayerContainer>
                        <TopRightPlayerContainer>
                            <PlayerInfoContainer
                                top="25%"
                                left="40%"
                                width="60%"
                                height="30%"
                                color="black">
                                Stanley Money: 20.000
                            </PlayerInfoContainer>
                            <PlayerCardsContainer
                                top="72.5%"
                                left="20%"
                                width="30%"
                                height="55%">
                                <CardBox
                                    width="30%"
                                    top="0"
                                    left="29%"
                                    height="100%"
                                    transform="rotate(180deg)">
                                    <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="30%"
                                    top="0"
                                    left="61%"
                                    height="100%"
                                    transform="rotate(180deg)">
                                    <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                                </CardBox>
                            </PlayerCardsContainer>
                        </TopRightPlayerContainer>
                    </UpperContainer>
                    <MiddleContainer>
                        <PlayerLeftContainer>
                            <PlayerInfoContainer
                                top="45%"
                                left="25%"
                                width="50%"
                                height="60%"
                                color="black">
                                PokerNoob Money: 20.000
                            </PlayerInfoContainer>
                            <PlayerCardsContainer
                                top="50%"
                                left="78%"
                                width="40%"
                                height="50%">
                                <CardBox
                                width="60%"
                                height="80%"
                                top="-15%"
                                left="20%"
                                transform="rotate(90deg)">
                                    <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                            </CardBox>
                                <CardBox
                                    width="60%"
                                    height="80%"
                                    top="35%"
                                    left="20%"
                                    transform="rotate(90deg)">
                                    <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                                </CardBox>
                            </PlayerCardsContainer>
                        </PlayerLeftContainer>
                        <TableComponentsContainer>
                            <TotalPotContainer>Total Pot: 20.000</TotalPotContainer>
                            <MiddleCardsContainer>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="68%">
                                    <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="58%">
                                    <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="48%">
                                    <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="38%">
                                    <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="28%">
                                    <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="80%">
                                </CardBox>
                            </MiddleCardsContainer>
                            <CallContainer>
                                <CallButton>Call</CallButton>
                            </CallContainer>
                            <RaiseContainer>
                                <RaiseButton>Raise</RaiseButton>
                                <RaiseInput type="number"></RaiseInput>
                            </RaiseContainer>
                        </TableComponentsContainer>
                        <PlayerRightContainer>
                            <PlayerInfoContainer
                                top="45%"
                                left="75%"
                                width="50%"
                                height="60%"
                                color="black">
                                BestPokerPlayerEUWest Money: 20.000
                            </PlayerInfoContainer>
                            <PlayerCardsContainer
                                top="50%"
                                left="22%"
                                width="40%"
                                height="50%">
                                <CardBox
                                    width="60%"
                                    height="80%"
                                    top="-15%"
                                    left="20%"
                                    transform="rotate(270deg)">
                                    <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="60%"
                                    height="80%"
                                    top="35%"
                                    left="20%"
                                    transform="rotate(270deg)">
                                    <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                                </CardBox>
                            </PlayerCardsContainer>
                        </PlayerRightContainer>
                    </MiddleContainer>
                    <LowerContainer>
                        <ChatContainer>
                            <InnerTextChatContainer>
                                <TextBacklogChatContainer>
                                    <Writen>BestPokerPlayerEUWest: Hello Guys</Writen>
                                    <Writen>Hacker: hi</Writen>
                                    <Writen>Stanley: EZ</Writen>
                                    <Writen>hi</Writen>
                                    <Writen>hi</Writen>
                                    <Writen>hi</Writen>
                                    <Writen>hi</Writen>
                                    <Writen>hi</Writen>
                                    <Writen>hi</Writen>
                                    <Writen>hi</Writen>
                                    <Writen>hi</Writen>
                                    <Writen>hi</Writen>
                                    <Writen>hi</Writen>
                                    <Writen>hi</Writen>
                                    <Writen>hi</Writen>
                                    <Writen>hi</Writen>
                                    <Writen>hi</Writen>
                                </TextBacklogChatContainer>
                                <ChatInputField placeholder = "Type in your message"></ChatInputField>
                            </InnerTextChatContainer>
                        </ChatContainer>
                        <CheckContainer>
                            <CheckButton>Check</CheckButton>
                        </CheckContainer>
                        <OwnCardsContainer>
                            <CardBox
                                width="35%"
                                height="80%"
                                top="50%"
                                left="28%">
                                <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                            </CardBox>
                            <CardBox
                                width="35%"
                                height="80%"
                                top="50%"
                                left="72%">
                                <FrontCardBox>{this.returnCard("TWO","HEART")}</FrontCardBox>
                            </CardBox>
                        </OwnCardsContainer>
                        <FoldContainer>
                            <FoldButton>Fold</FoldButton>
                        </FoldContainer>
                        <LeaveTableContainer>
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
                        <PlayerInfoContainer
                            top="50%"
                            left="50%"
                            width="30%"
                            height="60%"
                            color="white">
                            MySelf Money: 20.000
                        </PlayerInfoContainer>
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
