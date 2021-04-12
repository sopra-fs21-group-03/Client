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
import { Writen, LeaveTableButton, CheckButton, CallButton, RaiseButton, RaiseInput, FoldButton, InnerTextChatContainer, TextBacklogChatContainer, ChatInputField, Tablesquare, TableCircleLeft, TableCircleRight, GameContainer, UpperContainer, MiddleContainer, LowerContainer, BottomContainer, ChatContainer, LeaveTableContainer, CheckContainer, FoldContainer, OwnCardsContainer, PlayerLeftContainer, PlayerRightContainer, PlayerCardsContainer, TableComponentsContainer, TotalPotContainer, MiddleCardsContainer, CallContainer, RaiseContainer, TopLeftPlayerContainer, TopRightPlayerContainer, CardBox, PlayerInfoContainer, FrontCardBox} from "../../views/design/GameScreenStyle";

document.body.style.backgroundColor = "green";

class GameScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null
        };
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        this.props.history.push('/login');
    }

    game = new Game();
    myselfUser = new User();

    async updateGameScreen(){
        const gameResponse = await api.get('/games/1',{headers:{ Authorization: localStorage.getItem('token')}});
        this.game = gameResponse.data;

        const myselfUserResponse = await api.get('/games/1/' + localStorage.getItem('userID'),{headers:{ Authorization: localStorage.getItem('token')}});
        this.myselfUser = myselfUserResponse.data;
    }

    returnCard(cardNumber, Suit){
    const card = new Card({cardNumber: cardNumber, suit: Suit});
    return card.card}

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 500);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    river=this.game.river;

    getRiverCard(index){
        if (this.river[index]!=null){
            return this.river[index].card;}
        else{return null;}
    }

    returnCard(cardNumber, Suit){
        const card = new Card({cardNumber: cardNumber, suit: Suit});
        return card.card}

    render() {

        this.updateGameScreen();
        console.log(this.myselfUser);

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

                                </CardBox>
                                <CardBox
                                    width="30%"
                                    top="0"
                                    left="61%"
                                    height="100%"
                                    transform="rotate(180deg)">

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

                                </CardBox>
                                <CardBox
                                    width="30%"
                                    top="0"
                                    left="61%"
                                    height="100%"
                                    transform="rotate(180deg)">

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

                                </CardBox>
                                <CardBox
                                    width="60%"
                                    height="80%"
                                    top="35%"
                                    left="20%"
                                    transform="rotate(90deg)">

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
                                <FrontCardBox></FrontCardBox>

                                </CardBox>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="58%">

                                <FrontCardBox></FrontCardBox>

                                </CardBox>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="48%">
                                <FrontCardBox></FrontCardBox>

                                </CardBox>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="38%">
                                <FrontCardBox></FrontCardBox>

                                </CardBox>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="28%">
                                <FrontCardBox></FrontCardBox>

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

                                </CardBox>
                                <CardBox
                                    width="60%"
                                    height="80%"
                                    top="35%"
                                    left="20%"
                                    transform="rotate(270deg)">

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
                            <FrontCardBox>
                                {new Card(this.myselfUser.cards[0]).card}
                            </FrontCardBox>
                            </CardBox>
                            <CardBox
                                width="35%"
                                height="80%"
                                top="50%"
                                left="72%">
                                <FrontCardBox>
                                </FrontCardBox>
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
                            {this.myselfUser.username}
                        </PlayerInfoContainer>
                    </BottomContainer>
                </GameContainer>);
        }

        /* if(2==3){
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
        } */

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
