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
import { ProfileCircle, BigBlind, SmallBlind, Writen, LeaveTableButton, CheckButton, CallButton, RaiseButton, RaiseInput, FoldButton, InnerTextChatContainer, TextBacklogChatContainer, ChatInputField, Tablesquare, TableCircleLeft, TableCircleRight, GameContainer, UpperContainer, MiddleContainer, LowerContainer, BottomContainer, ChatContainer, LeaveTableContainer, CheckContainer, FoldContainer, OwnCardsContainer, PlayerLeftContainer, PlayerRightContainer, PlayerCardsContainer, TableComponentsContainer, TotalPotContainer, MiddleCardsContainer, CallContainer, RaiseContainer, TopLeftPlayerContainer, TopRightPlayerContainer, CardBox, PlayerInfoContainer, FrontCardBox} from "../../views/design/GameScreenStyle";

document.body.style.backgroundColor = "green";

//Normal PokerScreen
class GameScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            token: null,
            raiseAmount: null
        };
    }

    async call(){
        this.returnToken()
        await api.put("/games/1/"+localStorage.getItem('userID')+"/call", this.returnToken()  )
    }
    async check(){
        this.returnToken()
        await api.put("/games/1/"+localStorage.getItem('userID')+"/check", this.returnToken()  )
    }

    async fold(){
        this.returnToken()
        await api.put("/games/1/"+localStorage.getItem('userID')+"/fold", this.returnToken()  )
    }

    async raise(){
        this.returnToken()
        await api.put("/games/1/"+localStorage.getItem('userID')+"/raise",  this.returnRaiseAmountAndToken())
        this.state.raiseAmount = null;
    }
    async showdown(){
        const showdown= api.put('/games/1/showdown', {headers:{ Authorization: "e433026f-ebcd-4934-94a9-34ae1d760b74"}})
        console.log(showdown.data)
    }


    returnToken(){
        const requestBody = JSON.stringify({
            token: localStorage.getItem('token')
        });
        console.log(requestBody)
        return requestBody
    }

    returnRaiseAmountAndToken(){
        const requestBodyRaiseAmount = JSON.stringify({
            raiseAmount: this.state.raiseAmount,
            token: localStorage.getItem('token')
        });
        console.log(requestBodyRaiseAmount)
        return requestBodyRaiseAmount
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        this.props.history.push('/login');
    }

    game = new Game();
    myselfUser = new User();
    user1=new User();
    user2=new User();
    user3=new User();
    user4=new User();

    userOnTurn = new User();




    async updateGameScreen(){
        const gameResponse = await api.get('/games/1',{headers:{ Authorization: localStorage.getItem('token')}});
        this.game = gameResponse.data;



        const myselfUserResponse = await api.get('/games/1/' + localStorage.getItem('userID'),{headers:{ Authorization: localStorage.getItem('token')}});
        this.myselfUser = myselfUserResponse.data;
        if(this.game.players.length==5){
        this.userOnTurn = this.game.onTurn;

        for(var i=0; i<5; i++){
            if(this.game.players[i].username==this.myselfUser.username){
                this.user4=this.game.players[(i+1)%5]
                this.user3=this.game.players[(i+2)%5]
                this.user2=this.game.players[(i+3)%5]
                this.user1=this.game.players[(i+4)%5]
            }
        }}


        //From here GameUpdate it is only style stuff (display etc)

        //Buttons should only display when player on Turn
        if(this.myselfUser.username != this.userOnTurn.username){
            document.getElementById("callButton").style.display="none";
            document.getElementById("raiseButton").style.display="none";
            document.getElementById("raiseInput").style.display="none";
            document.getElementById("checkButton").style.display="none";
            document.getElementById("foldButton").style.display="none";
        }

        if(this.myselfUser.username == this.userOnTurn.username){
            document.getElementById("callButton").style.display="inline";
            document.getElementById("raiseButton").style.display="inline";
            document.getElementById("raiseInput").style.display="inline";
            document.getElementById("checkButton").style.display="inline";
            document.getElementById("foldButton").style.display="inline";
        }

        //RiverCards will not be displayed when there is none
        if(this.game.river.cards.length >= 1){
            document.getElementById("riverCard0").style.display="inline";
        }

        if(this.game.river.cards.length >= 2){
            document.getElementById("riverCard1").style.display="inline";
        }

        if(this.game.river.cards.length >= 3){
            document.getElementById("riverCard2").style.display="inline";
        }

        if(this.game.river.cards.length >= 4){
            document.getElementById("riverCard3").style.display="inline";
        }

        if(this.game.river.cards.length >= 5){
            document.getElementById("riverCard4").style.display="inline";
        }

        if(this.game.river.cards.length < 1){
            document.getElementById("riverCard0").style.display="none";
        }

        if(this.game.river.cards.length < 2){
            document.getElementById("riverCard1").style.display="none";
        }

        if(this.game.river.cards.length < 3){
            document.getElementById("riverCard2").style.display="none";
        }

        if(this.game.river.cards.length < 4){
            document.getElementById("riverCard3").style.display="none";
        }

        if(this.game.river.cards.length < 5){
            document.getElementById("riverCard4").style.display="none";
        }

        //not turn: if play.self has no cards, there should be no card displayed
        if(document.getElementById("ownCardBox1") != null
            && document.getElementById("ownCardBox2") != null){
            if(this.myselfUser.cards.length == 0){
                document.getElementById("ownCardBox1").style.display="none";
                document.getElementById("ownCardBox2").style.display="none";
            }
            if(this.myselfUser.cards.length == 2){
                document.getElementById("ownCardBox1").style.display="inline";
                document.getElementById("ownCardBox2").style.display="inline";
            }
        }

        //If User is on turn his name should display in red

        if(document.getElementById("player1InfoOnTurn") != null
            && this.user1.username != null && this.userOnTurn.username != null
        ){
            if(this.user1.username == this.userOnTurn.username){
                document.getElementById("player1InfoOnTurn").style.color="red";
            }
            if(this.user1.username != this.userOnTurn.username){
                document.getElementById("player1InfoOnTurn").style.color="black";
            }
        }

        if(document.getElementById("player2InfoOnTurn") != null
            && this.user2.username != null && this.userOnTurn.username != null
        ){
            if(this.user2.username == this.userOnTurn.username){
                document.getElementById("player2InfoOnTurn").style.color="red";
            }
            if(this.user2.username != this.userOnTurn.username){
                document.getElementById("player2InfoOnTurn").style.color="black";
            }
        }

        if(document.getElementById("player3InfoOnTurn") != null
            && this.user3.username != null && this.userOnTurn.username != null
        ){
            if(this.user3.username == this.userOnTurn.username){
                document.getElementById("player3InfoOnTurn").style.color="red";
            }
            if(this.user3.username != this.userOnTurn.username){
                document.getElementById("player3InfoOnTurn").style.color="black";
            }
        }

        if(document.getElementById("player4InfoOnTurn") != null
            && this.user4.username != null && this.userOnTurn.username != null
        ){
            if(this.user4.username == this.userOnTurn.username){
                document.getElementById("player4InfoOnTurn").style.color="red";
            }
            if(this.user4.username != this.userOnTurn.username){
                document.getElementById("player4InfoOnTurn").style.color="black";
            }
        }

        if(document.getElementById("playerOwnUserInfoOnTurn") != null
            && this.myselfUser.username != null && this.userOnTurn.username != null
        ){
            if(this.myselfUser.username == this.userOnTurn.username){
                document.getElementById("playerOwnUserInfoOnTurn").style.color="red";
            }
            if(this.myselfUser.username != this.userOnTurn.username){
                document.getElementById("playerOwnUserInfoOnTurn").style.color="white";
            }
        }

        //If display blinds
        if (this.user1.blind == "SMALL"){
            document.getElementById("1S").style.display="inline";
            document.getElementById("1B").style.display="none";
        }
        if (this.user1.blind == "BIG"){
            document.getElementById("1S").style.display="none";
            document.getElementById("1B").style.display="inline";
        }
        if (this.user1.blind == "NEUTRAL" || this.user1.blind==null){
            document.getElementById("1S").style.display="none";
            document.getElementById("1B").style.display="none";
        }

        if (this.user2.blind == "SMALL"){
            document.getElementById("2S").style.display="inline";
            document.getElementById("2B").style.display="none";
        }
        if (this.user2.blind == "BIG"){
            document.getElementById("2S").style.display="none";
            document.getElementById("2B").style.display="inline";
        }
        if (this.user2.blind == "NEUTRAL" || this.user1.blind==null){
            document.getElementById("2S").style.display="none";
            document.getElementById("2B").style.display="none";
        }

        if (this.user3.blind == "SMALL"){
            document.getElementById("3S").style.display="inline";
            document.getElementById("3B").style.display="none";
        }
        if (this.user3.blind == "BIG"){
            document.getElementById("3S").style.display="none";
            document.getElementById("3B").style.display="inline";
        }
        if (this.user3.blind == "NEUTRAL" || this.user1.blind==null){
            document.getElementById("3S").style.display="none";
            document.getElementById("3B").style.display="none";
        }

        if (this.user4.blind == "SMALL"){
            document.getElementById("4S").style.display="inline";
            document.getElementById("4B").style.display="none";
        }
        if (this.user4.blind == "BIG"){
            document.getElementById("4S").style.display="none";
            document.getElementById("4B").style.display="inline";
        }
        if (this.user4.blind == "NEUTRAL" || this.user1.blind==null){
            document.getElementById("4S").style.display="none";
            document.getElementById("4B").style.display="none";
        }

        if (this.myselfUser.blind == "SMALL"){
            document.getElementById("OwnS").style.display="inline";
            document.getElementById("OwnB").style.display="none";
        }
        if (this.myselfUser.blind == "BIG"){
            document.getElementById("OwnS").style.display="none";
            document.getElementById("OwnB").style.display="inline";
        }
        if (this.myselfUser.blind == "NEUTRAL" || this.user1.blind==null){
            document.getElementById("OwnS").style.display="none";
            document.getElementById("OwnB").style.display="none";
        }
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



    getRiverCard(index){

        if (this.game.river.cards!=null){
            if(this.game.river.cards[index]!=null){

            const card=new Card(this.game.river.cards[index])

            return card.card;}}
        else{return null;}
    }

    returnCard(cardNumber, Suit){
        const card = new Card({cardNumber: cardNumber, suit: Suit});
        return card.card}

    handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
    }

    render() {

        this.updateGameScreen();
        console.log(this.game)
        console.log(this.returnToken())
        this.showdown();

        //not turn and on turn
        if(1==1) {
            return (

                <GameContainer>
                    <TableCircleLeft></TableCircleLeft>
                    <TableCircleRight></TableCircleRight>
                    <Tablesquare></Tablesquare>
                    <UpperContainer>
                        <TopLeftPlayerContainer>
                            <PlayerInfoContainer
                                top="25%"
                                left="57.5%"
                                width="40%"
                                height="20%"
                                color="white"
                                background="grey"
                                padding= "0 0 0 70px"
                                id="player2InfoOnTurn"
                                borderradius="10px"
                                border="solid white 1px">
                                {this.user2.username}Money : {this.user2.money}
                            </PlayerInfoContainer>
                            <ProfileCircle
                                top="15%"
                                left="30%"
                                background='url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user1.jpg")'></ProfileCircle>
                            <BigBlind
                                top="70%"
                                left="75%"
                                id="2B"
                                transform="rotate(180deg)">B</BigBlind>
                            <SmallBlind
                                top="70%"
                                left="75%"
                                id="2S"
                                transform="rotate(180deg)">S</SmallBlind>
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
                                    <FrontCardBox>{}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="30%"
                                    top="0"
                                    left="61%"
                                    height="100%"
                                    transform="rotate(180deg)">
                                    <FrontCardBox>{}</FrontCardBox>
                                </CardBox>
                            </PlayerCardsContainer>
                        </TopLeftPlayerContainer>
                        <TopRightPlayerContainer>
                            <BigBlind
                                top="70%"
                                left="35%"
                                id="3B"
                                transform="rotate(180deg)">B</BigBlind>
                            <SmallBlind
                                top="70%"
                                left="35%"
                                id="3S"
                                transform="rotate(180deg)">S</SmallBlind>
                            <PlayerInfoContainer
                                top="25%"
                                left="27.5%"
                                width="40%"
                                height="20%"
                                color="white"
                                background="grey"
                                padding= "0 70px 0 10px"
                                id="player3InfoOnTurn"
                                borderradius="10px"
                                border="solid white 1px">
                                {this.user3.username} Money : {this.user3.money}
                            </PlayerInfoContainer>
                            <ProfileCircle
                                top="15%"
                                left="40%"
                                background='url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user2.jpg")'></ProfileCircle>
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
                                    <FrontCardBox>{}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="30%"
                                    top="0"
                                    left="61%"
                                    height="100%"
                                    transform="rotate(180deg)">
                                    <FrontCardBox>{}</FrontCardBox>
                                </CardBox>
                            </PlayerCardsContainer>
                        </TopRightPlayerContainer>
                    </UpperContainer>
                    <MiddleContainer>
                        <PlayerLeftContainer>
                            <BigBlind
                                top="80%"
                                left="75%"
                                id="1B"
                                transform="rotate(90deg)">B</BigBlind>
                            <SmallBlind
                                top="80%"
                                left="75%"
                                id="1S"
                                transform="rotate(90deg)">S</SmallBlind>
                            <PlayerInfoContainer
                                top="11.5%"
                                left="73%"
                                width="90%"
                                height="13%"
                                color="white"
                                background="grey"
                                padding= "0 0 0 70px"
                                id="player1InfoOnTurn"
                                borderradius="10px"
                                border="solid white 1px">
                                {this.user1.username} Money : {this.user1.money}
                            </PlayerInfoContainer>
                            <ProfileCircle
                                top="5%"
                                left="10%"
                                background='url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user3.jpg")'></ProfileCircle>
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
                                    <FrontCardBox>{}</FrontCardBox>
                            </CardBox>
                                <CardBox
                                    width="60%"
                                    height="80%"
                                    top="35%"
                                    left="20%"
                                    transform="rotate(90deg)">
                                    <FrontCardBox>{}</FrontCardBox>
                                </CardBox>
                            </PlayerCardsContainer>
                        </PlayerLeftContainer>
                        <TableComponentsContainer>
                            <TotalPotContainer>Total Pot: {this.game.pot.total}</TotalPotContainer>
                            <MiddleCardsContainer>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="68%"
                                    id="riverCard0">
                                    <FrontCardBox>{this.getRiverCard(0)}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="58%"
                                    id="riverCard1">
                                    <FrontCardBox>{this.getRiverCard(1)}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="48%"
                                    id="riverCard2">
                                    <FrontCardBox>{this.getRiverCard(2)}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="38%"
                                    id="riverCard3">
                                    <FrontCardBox>{this.getRiverCard(3)}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="28%"
                                    id="riverCard4">
                                    <FrontCardBox>{this.getRiverCard(4)}</FrontCardBox>
                                </CardBox>
                            </MiddleCardsContainer>
                            <CallContainer>
                                <CallButton onClick={() => {
                                this.call();
                                }}
                                id="callButton"
                                >Call</CallButton>
                            </CallContainer>
                            <RaiseContainer>
                                <RaiseButton onClick={() => {
                                    this.raise();
                                }}
                                disabled={!this.state.raiseAmount}
                                id="raiseButton"
                                >Raise</RaiseButton>
                                <RaiseInput type="number" onChange={e => {
                                    this.handleInputChange('raiseAmount', e.target.value);
                                }}
                                id="raiseInput"></RaiseInput>
                            </RaiseContainer>
                        </TableComponentsContainer>
                        <PlayerRightContainer>
                            <BigBlind
                                top="80%"
                                left="15%"
                                id="4B"
                                transform="rotate(270deg)">B</BigBlind>
                            <SmallBlind
                                top="80%"
                                left="15%"
                                id="4S"
                                transform="rotate(270deg)">S</SmallBlind>
                            <PlayerInfoContainer
                                top="11.5%"
                                left="25%"
                                width="90%"
                                height="13%"
                                color="white"
                                background="grey"
                                padding= "0 70px 0 10px"
                                id="player4InfoOnTurn"
                                borderradius="10px"
                                border="solid white 1px">
                                {this.user4.username} Money : {this.user4.money}
                            </PlayerInfoContainer>
                            <ProfileCircle
                                top="5%"
                                left="50%"
                                background='url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user4.jpg")'></ProfileCircle>
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
                                    <FrontCardBox>{}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="60%"
                                    height="80%"
                                    top="35%"
                                    left="20%"
                                    transform="rotate(270deg)">
                                    <FrontCardBox>{}</FrontCardBox>
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
                        <BigBlind
                            top="-10%"
                            left="49%"
                            id="OwnB">B</BigBlind>
                        <SmallBlind
                            top="-10%"
                            left="49%"
                            id="OwnS">S</SmallBlind>
                        <CheckContainer>
                            <CheckButton onClick={() => {
                                this.check();
                            }}
                            id="checkButton">Check</CheckButton>
                        </CheckContainer>
                        <OwnCardsContainer>
                            <CardBox
                                width="35%"
                                height="80%"
                                top="50%"
                                left="28%"
                                id="ownCardBox1">
                                <FrontCardBox>{new Card(this.myselfUser.cards[0]).card}</FrontCardBox>
                            </CardBox>
                            <CardBox
                                width="35%"
                                height="80%"
                                top="50%"
                                left="72%"
                                id="ownCardBox2"
                                visibility="hidden">
                                <FrontCardBox>{new Card(this.myselfUser.cards[1]).card}</FrontCardBox>
                            </CardBox>
                        </OwnCardsContainer>
                        <FoldContainer>
                            <FoldButton onClick={() => {
                                this.fold();
                            }}
                            id="foldButton">Fold</FoldButton>
                        </FoldContainer>
                        <LeaveTableContainer>
                            <LeaveTableButton
                            onClick={() => {
                                this.logout()

                            }}
                            >
                            Leave Table
                            </LeaveTableButton>
                        </LeaveTableContainer>
                    </LowerContainer>
                    <BottomContainer>
                        <PlayerInfoContainer
                            top="50%"
                            left="55%"
                            width="30%"
                            height="60%"
                            color="white"
                            id="playerOwnUserInfoOnTurn">
                            {this.myselfUser.username} Money : {this.myselfUser.money}
                        </PlayerInfoContainer>
                        <ProfileCircle
                        top="-120%"
                        left="30%"
                        background='url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user5.jpg")'></ProfileCircle>
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
