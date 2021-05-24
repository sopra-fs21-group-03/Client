import React from 'react';
import {api} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import User from '../shared/models/User';
import Card from "../shared/models/Card";
import Game from "../shared/models/Game";
import {
    DisplayUserInfo,
    WinnerSlogan,
    WinnerPicture,
    WinnerContainer,
    Loader,
    ProfileCircle,
    BigBlind,
    SmallBlind,
    LeaveTableButton,
    CheckButton,
    CallButton,
    RaiseButton,
    RaiseInput,
    FoldButton,
    InnerTextChatContainer,
    TextBacklogChatContainer,
    ChatInputField,
    Tablesquare,
    TableCircleLeft,
    TableCircleRight,
    GameContainer,
    UpperContainer,
    MiddleContainer,
    LowerContainer,
    BottomContainer,
    ChatContainer,
    LeaveTableContainer,
    CheckContainer,
    FoldContainer,
    OwnCardsContainer,
    PlayerLeftContainer,
    PlayerRightContainer,
    PlayerCardsContainer,
    TableComponentsContainer,
    TotalPotContainer,
    MiddleCardsContainer,
    CallContainer,
    RaiseContainer,
    TopLeftPlayerContainer,
    TopRightPlayerContainer,
    BackOfCard,
    PlayerInfoContainer,
    PlaceHolderCard,
    LoadingGameContainer,
    LeaveTableButtonEndScreen,
    LooserPicture,
    LooserContainer,
    ChatSendButton,
    EmojiButton,
    EmojiContainer, SingleEmojiButton, PictureCardBox, Combinations, SpotifyContainerInGame
} from "../../views/design/GameScreenStyle";
import ChatMessageField from "../../views/ChatMessageField";
import styled from "styled-components";
import {BlackButton} from "../../views/design/BlackButton";
import SpotifyPlayer from "../music/SpotifyPlayer";

document.body.style.backgroundColor = "green";

const ProfilePicture = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.background || null}; 
`;

const CombinationButton = styled(BlackButton)`
  position: absolute;
  top: 33%;
  left: 25%;
  background: rgb(0,0,0,0.8);
  height: 25%;
  width: 60%;
  font-size: 24pt;
  font-weight: 200;
  overflow: hidden;
`;

//Normal PokerScreen
class GameScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            token: null,
            raiseAmount: null,
            chatMessage: null,
            chatLog: null
        };
    }

    returnProfilePicture(game, userFrontEnd){

        let profilepicture = null;
        if(game.players[0].username == userFrontEnd.username){
            profilepicture = <ProfilePicture background = 'url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user1.jpg") center'></ProfilePicture>
            return profilepicture
        }
        else if(game.players[1].username == userFrontEnd.username){
            profilepicture = <ProfilePicture background = 'url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user2.jpg") center'></ProfilePicture>
            return profilepicture
        }
        else if(game.players[2].username == userFrontEnd.username){
            profilepicture = <ProfilePicture background = 'url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user3.jpg") center'></ProfilePicture>
            return profilepicture
        }
        else if(game.players[3].username == userFrontEnd.username){
            profilepicture = <ProfilePicture background = 'url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user4.jpg") center'></ProfilePicture>
            return profilepicture
        }
        else if(game.players[4].username == userFrontEnd.username){
            profilepicture = <ProfilePicture background = 'url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user5.jpg") center'></ProfilePicture>
            return profilepicture
        }
    }

    scrollToEnd(){
        let chatList = document.getElementById("chatList");
        chatList.scrollTop = chatList.scrollHeight;
    }

    chatCounter = 0;

    async fetchChat() {
        const response = await api.get("/games/" + localStorage.getItem("gameId") + "/" + localStorage.getItem('userID') + "/chats", {headers: {Authorization: localStorage.getItem('token')}});
        this.setState({chatLog: response.data});
        if (response.data.length > this.chatCounter){
            if(document.getElementById("chatList") != null){
                this.scrollToEnd();
            }
        }
        this.chatCounter = response.data.length;
    }

    async call() {
        await api.put("/games/" + localStorage.getItem("gameId") + "/" + localStorage.getItem('userID') + "/call", this.returnToken())
    }

    async check() {
        await api.put("/games/" + localStorage.getItem("gameId") + "/" + localStorage.getItem('userID') + "/check", this.returnToken())
    }

    async fold() {
        await api.put("/games/" + localStorage.getItem("gameId") + "/" + localStorage.getItem('userID') + "/fold", this.returnToken())
    }

    async raise() {
        await api.put("/games/" + localStorage.getItem("gameId") + "/" + localStorage.getItem('userID') + "/raise", this.returnRaiseAmountAndToken())
        this.state.raiseAmount = null;
        document.getElementById("raiseInputField").value = "";
    }

    async sendMessage(){
        if(this.state.chatMessage != null) {
            await api.put("/games/" + localStorage.getItem("gameId") + "/" + localStorage.getItem('userID') + "/chats", this.returnChatMessageAndToken())
            this.state.chatMessage = null;
            document.getElementById("chatInputField").value = "";
        }
    }

    addEmoji(emoji){
        document.getElementById("chatInputField").value = document.getElementById("chatInputField").value + emoji;
        this.handleInputChange('chatMessage', document.getElementById("chatInputField").value);
    }

    async showdown() {
        const showdown = await api.get('/games/' + localStorage.getItem('gameId') + '/showdown', {headers: {Authorization: localStorage.getItem('token')}})
        const playerList = showdown.data;
        for (let i = 0; i < 5; i++) {
            if (playerList[i].username == this.myselfUser.username) {
                this.showdownUser4 = new User(playerList[(i + 1) % 5]);
                this.showdownUser3 = new User(playerList[(i + 2) % 5]);
                this.showdownUser2 = new User(playerList[(i + 3) % 5]);
                this.showdownUser1 = new User(playerList[(i + 4) % 5]);
            }
        }
    }

    getUserCard(user, index) {
        if (user.cards != null && user.cards.length != 0) {
            return new Card(user.cards[index]).card
        } else {
            return null;
        }
    }


    returnToken() {
        return JSON.stringify({
            token: localStorage.getItem('token')
        })
    }

    returnRaiseAmountAndToken() {
        return JSON.stringify({
            raiseAmount: this.state.raiseAmount,
            token: localStorage.getItem('token')
        })
    }

    returnChatMessageAndToken() {
        return JSON.stringify({
            token: localStorage.getItem('token'),
            message: this.state.chatMessage
        })
    }

    async leaveTable() {
        await api.put('/games/' + localStorage.getItem('gameId') + '/' + localStorage.getItem('userID') + '/leave', this.returnToken());
        localStorage.removeItem("gameId");
        this.props.history.push('/lobbyscreen');
    }


    returnTokenAndIfReveal(boolean) {
        return JSON.stringify({
            token: localStorage.getItem('token'),
            wantsToShow: boolean
        })
    }

    displayUser(user) {
        let maxBet = 0
        for (let i = 1; i < 6; i++) {
            if (this.game.pot.contribution[i.toString()] > maxBet) {
                maxBet = this.game.pot.contribution[i.toString()]
            }
        }
        return <DisplayUserInfo>{user.username} <br></br> Money : {user.money} Betting
            : {this.findMoneyInPot(user)}
        </DisplayUserInfo>;
    }

    findMoneyInPot(user) {
        return this.game.pot.contribution[user.username];
    }

    displayHowMuchCall(user) {
        let maxBet = 0
        let valueList = Object.values(this.game.pot.contribution);

        for (let index in valueList) {
            if (valueList[index] > maxBet) {
                maxBet = valueList[index];
            }
        }

        return maxBet - this.findMoneyInPot(user);
    }

    async revealCards(boolean) {
        await api.put('/games/' + localStorage.getItem("gameId") + '/' + localStorage.getItem('userID') + '/show', this.returnTokenAndIfReveal(boolean));
    }

    lostPlayersCounter = null;
    game = new Game();
    showdownUser1 = new User();
    showdownUser2 = new User();
    showdownUser3 = new User();
    showdownUser4 = new User();
    myselfUser = new User();
    user1 = new User();
    user2 = new User();
    user3 = new User();
    user4 = new User();
    userOnTurn = new User();
    combinations=null;

    async updateGameScreen() {

        if (this.game.showdown) {
            this.showdown();
        }

        if (!this.game.showdown) {
            this.showdownUser1 = new User();
            this.showdownUser2 = new User();
            this.showdownUser3 = new User();
            this.showdownUser4 = new User();
        }

        if (this.game.gameName != null) {
            await this.fetchChat();
        }

        const gameResponse = await api.get('/games/' + localStorage.getItem("gameId"), {headers: {Authorization: localStorage.getItem('token')}});
        this.game = new Game(gameResponse.data);


        const myselfUserResponse = await api.get('/games/' + localStorage.getItem("gameId") + '/' + localStorage.getItem('userID'), {headers: {Authorization: localStorage.getItem('token')}});
        this.myselfUser = new User(myselfUserResponse.data);
        if (this.game.players.length == 5) {
            this.userOnTurn = this.game.onTurn;

            for (let i = 0; i < 5; i++) {
                if (this.game.players[i].username == this.myselfUser.username) {
                    this.user4 = new User(this.game.players[(i + 1) % 5])
                    this.user3 = new User(this.game.players[(i + 2) % 5])
                    this.user2 = new User(this.game.players[(i + 3) % 5])
                    this.user1 = new User(this.game.players[(i + 4) % 5])

                }

            }
        }
    }

    returnCard(cardNumber, Suit) {
        const card = new Card({cardNumber: cardNumber, suit: Suit});
        return card.card
    }


    async componentDidMount() {
        this.interval = setInterval(async () => {
            await this.updateGameScreen();
            this.setState({time: Date.now()})
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getRiverCard(index) {

        if (this.game.river.cards != null) {
            if (this.game.river.cards[index] != null) {

                const card = new Card(this.game.river.cards[index])

                return card.card;
            }
        } else {
            return null;
        }
    }

    enterPressed(event){
        var code = event.keyCode || event.which;
        if(code === 13){
            this.sendMessage();
        }
    }

    showCombinations(){
        if(this.combinations==null) {
            this.combinations = <Combinations></Combinations>
        }
        else{
            this.combinations=null;
        }
    }

    returnCard(cardNumber, Suit) {
        const card = new Card({cardNumber: cardNumber, suit: Suit});
        return card.card
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({[key]: value});
    }

    render() {
        if (this.game.round == "ENDED") {
            if (this.myselfUser.money != 0) {
                return (
                    <WinnerContainer color='white'>
                        <WinnerPicture top='25%' left='10%'></WinnerPicture>
                        <WinnerSlogan top='50%' left='60%'>
                            WINNER WINNER <br></br>CHICKENDINNER !!!
                        </WinnerSlogan>
                        <div className="pyro">
                            <div className="before"></div>
                            <div className="after"></div>
                        </div>
                        <LeaveTableButtonEndScreen
                            onClick={() => {
                                this.leaveTable()

                            }}
                            background='rgb(255,0,0,0.2)'
                            color='white'
                            bordercolor='white'
                        >
                            Leave Table
                        </LeaveTableButtonEndScreen>
                    </WinnerContainer>)
            } else {
                return (
                    <LooserContainer>
                        <LooserPicture top='25%' left='10%'></LooserPicture>
                        <WinnerSlogan top='50%' left='60%'>
                            BETTER LUCK <br></br>NEXT TIME !!!
                        </WinnerSlogan>
                        <LeaveTableButtonEndScreen
                            onClick={() => {
                                this.leaveTable()

                            }}
                            background='rgb(255,0,0,1)'
                            color='black'
                            bordercolor='black'
                        >
                            Leave Table
                        </LeaveTableButtonEndScreen>
                    </LooserContainer>)
            }
        }

        //InGame
        else if (this.game.gameName != null) {
            return (
                <GameContainer>
                    <TableCircleLeft></TableCircleLeft>
                    <TableCircleRight></TableCircleRight>
                    <Tablesquare></Tablesquare>
                    <UpperContainer>
                        <TopLeftPlayerContainer>
                            {this.user2.inGame ? (
                                    this.user2.username == this.userOnTurn.username ? (
                                            <PlayerInfoContainer
                                                top="27.5%" left="62.5%" width="50%" height="30%" color="red" background="grey"
                                                padding="0 0 0 90px" borderradius="10px"
                                                className = "infobox">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                {this.displayUser(this.user2)}
                                            </PlayerInfoContainer>
                                        ) : (
                                            <PlayerInfoContainer
                                                top="27.5%" left="62.5%" width="50%" height="30%" color="white" background="grey"
                                                padding="0 0 0 90px" borderradius="10px" border="solid white 1px">
                                                {this.displayUser(this.user2)}
                                            </PlayerInfoContainer>
                                        )) : (null)}
                            {this.user2.inGame ? (
                                this.user2.username == this.userOnTurn.username ? (
                                        <ProfileCircle
                                            top="12.5%" left="30%" bordercolor = "red">
                                            {this.returnProfilePicture(this.game, this.user2)}
                                        </ProfileCircle>
                                    ) : (
                                        <ProfileCircle
                                            top="12.5%" left="30%" bordercolor = "white">
                                            {this.returnProfilePicture(this.game, this.user2)}
                                        </ProfileCircle>
                                    )) : (null)}
                            {this.user2.blind == "BIG" ?
                                (<BigBlind
                                    top="70%" left="75%" transform="rotate(180deg)">B</BigBlind>) :
                                (<h1></h1>)}
                            {this.user2.blind == "SMALL" ?
                                (<SmallBlind top="70%" left="75%" transform="rotate(180deg)">S</SmallBlind>) :
                                (<h1></h1>)}

                            {!this.user2.inGame ? (null) : (
                                this.user2.folded ? (null) : (
                            this.game.showdown ?
                                (this.getUserCard(this.showdownUser2, 0) ? (
                                        <PlayerCardsContainer
                                            top="72.5%" left="60%" width="30%" height="55%">
                                            <PictureCardBox
                                                width="30%" top="0" left="29%" height="100%" transform="rotate(180deg)">
                                                <PlaceHolderCard>
                                                    {this.getUserCard(this.showdownUser2, 0)}
                                                </PlaceHolderCard>
                                            </PictureCardBox>
                                            <PictureCardBox
                                                width="30%" top="0" left="61%" height="100%" transform="rotate(180deg)">
                                                <PlaceHolderCard>
                                                    {this.getUserCard(this.showdownUser2, 1)}
                                                </PlaceHolderCard>
                                            </PictureCardBox>
                                        </PlayerCardsContainer>
                                    ) : (
                                        <PlayerCardsContainer
                                        top="72.5%" left="60%" width="30%" height="55%">
                                        <BackOfCard
                                            width="30%" top="0" left="29%" height="100%" transform="rotate(180deg)">
                                        </BackOfCard>
                                        <BackOfCard
                                            width="30%" top="0" left="61%" height="100%" transform="rotate(180deg)">
                                        </BackOfCard>
                                    </PlayerCardsContainer>
                                    )) :
                                (
                                    <PlayerCardsContainer
                                    top="72.5%" left="60%" width="30%" height="55%">
                                    <BackOfCard
                                        width="30%" top="0" left="29%" height="100%" transform="rotate(180deg)">
                                    </BackOfCard>
                                    <BackOfCard
                                        width="30%" top="0" left="61%" height="100%" transform="rotate(180deg)">
                                    </BackOfCard>
                                </PlayerCardsContainer>
                                )))}
                        </TopLeftPlayerContainer>

                        <TopRightPlayerContainer>
                            {this.user3.blind == "BIG" ?
                                (<BigBlind
                                    top="70%" left="35%" transform="rotate(180deg)">B</BigBlind>) :
                                (<h1></h1>)}
                            {this.user3.blind == "SMALL" ?
                                (<SmallBlind top="70%" left="35%" transform="rotate(180deg)">S</SmallBlind>) :
                                (<h1></h1>)}
                            {this.user3.username == this.userOnTurn.username ? (
                                <PlayerInfoContainer
                                    top="27.5%" left="37.5%" width="50%" height="30%" color="red"
                                    padding="0 90px 0 10px" borderradius="10px" className = "infobox">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    {this.displayUser(this.user3)}
                                </PlayerInfoContainer>
                            ) : (
                                !this.user3.inGame ? (
                                    null
                                ):(
                                        <PlayerInfoContainer
                                            top="27.5%" left="37.5%" width="50%" height="30%" color="white"
                                            padding="0 90px 0 10px" borderradius="10px" border="solid white 1px">
                                            {this.displayUser(this.user3)}
                                        </PlayerInfoContainer>
                                    ))}
                            {this.user3.inGame ? (
                                this.user3.username == this.userOnTurn.username ? (
                                <ProfileCircle
                                    top="12.5%" left="54%" bordercolor = "red">
                                    {this.returnProfilePicture(this.game, this.user3)}
                                </ProfileCircle>
                            ) : (
                                <ProfileCircle
                                    top="12.5%" left="54%" bordercolor = "white">
                                    {this.returnProfilePicture(this.game, this.user3)}
                                </ProfileCircle>
                            )
                            ) : (null)}


                            {!this.user3.inGame ? (null) : (
                                this.user3.folded ? (null) : (
                                    this.game.showdown ?
                                        (this.getUserCard(this.showdownUser3, 0) ? (
                                                <PlayerCardsContainer
                                                    top="72.5%" left="20%" width="30%" height="55%">
                                                    <PictureCardBox
                                                        width="30%" top="0" left="29%" height="100%" transform="rotate(180deg)">
                                                        <PlaceHolderCard>
                                                            {this.getUserCard(this.showdownUser3, 0)}
                                                        </PlaceHolderCard>
                                                    </PictureCardBox>
                                                    <PictureCardBox
                                                        width="30%" top="0" left="61%" height="100%" transform="rotate(180deg)">
                                                        <PlaceHolderCard>
                                                            {this.getUserCard(this.showdownUser3, 1)}
                                                        </PlaceHolderCard>
                                                    </PictureCardBox>
                                                </PlayerCardsContainer>
                                        ) : (
                                            <PlayerCardsContainer
                                                top="72.5%" left="20%" width="30%" height="55%">
                                                <BackOfCard
                                                    width="30%" top="0" left="29%" height="100%" transform="rotate(180deg)">
                                                </BackOfCard>
                                                <BackOfCard
                                                    width="30%" top="0" left="61%" height="100%" transform="rotate(180deg)">
                                                </BackOfCard>
                                            </PlayerCardsContainer>
                                            )) :
                                        (
                                        <PlayerCardsContainer
                                            top="72.5%" left="20%" width="30%" height="55%">
                                            <BackOfCard
                                                width="30%" top="0" left="29%" height="100%" transform="rotate(180deg)">
                                            </BackOfCard>
                                            <BackOfCard
                                                width="30%" top="0" left="61%" height="100%" transform="rotate(180deg)">
                                            </BackOfCard>
                                        </PlayerCardsContainer>
                                )))}
                        </TopRightPlayerContainer>
                    </UpperContainer>
                    <MiddleContainer>
                        <PlayerLeftContainer>
                            {this.user1.blind == "BIG" ?
                                (<BigBlind top="80%" left="75%" transform="rotate(90deg)">B</BigBlind>) :
                                (<h1></h1>)}
                            {this.user1.blind == "SMALL" ?
                                (<SmallBlind top="80%" left="75%" transform="rotate(90deg)">S</SmallBlind>) :
                                (<h1></h1>)}
                            {this.user1.inGame == true ? (
                                this.user1.username == this.userOnTurn.username ? (
                                    <PlayerInfoContainer
                                        top="11.5%" left="75%" width="115%" height="19%" color="red"
                                        background="grey" padding="0 0 0 90px"
                                        borderradius="10px" className = "infobox">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        {this.displayUser(this.user1)}
                                    </PlayerInfoContainer>
                                ) : (
                                    <PlayerInfoContainer
                                        top="11.5%" left="75%" width="115%" height="19%" color="white"
                                        background="grey" padding="0 0 0 90px"
                                        borderradius="10px" border="solid white 1px">
                                        {this.displayUser(this.user1)}
                                    </PlayerInfoContainer>
                                )) : (<p1/>)}
                            {this.user1.inGame == true ? (
                                this.user1.username == this.userOnTurn.username ? (
                                    <ProfileCircle
                                        top="2%" left="0%" bordercolor="red">
                                        {this.returnProfilePicture(this.game, this.user1)}
                                    </ProfileCircle>
                            ) : (
                                <ProfileCircle
                                top="2%" left="0%" bordercolor="white">
                            {this.returnProfilePicture(this.game, this.user1)}
                                </ProfileCircle>
                                )) : (<p1/>)}

                            {!this.user1.inGame ? (null) : (
                                this.user1.folded ? (null) : (
                                    this.game.showdown ?
                                        (this.getUserCard(this.showdownUser1, 0) ? (
                                                <PlayerCardsContainer
                                                    top="50%" left="78%" width="40%" height="50%">
                                                    <PictureCardBox
                                                        width="60%" height="80%" top="-15%" left="20%" transform="rotate(90deg)">
                                                        <PlaceHolderCard>
                                                            {this.getUserCard(this.showdownUser1, 0)}
                                                        </PlaceHolderCard>
                                                    </PictureCardBox>
                                                    <PictureCardBox
                                                        width="60%" height="80%" top="35%" left="20%" transform="rotate(90deg)">
                                                        <PlaceHolderCard>
                                                            {this.getUserCard(this.showdownUser1, 1)}
                                                        </PlaceHolderCard>
                                                    </PictureCardBox>
                                                </PlayerCardsContainer>
                                        ) : (
                                            <PlayerCardsContainer
                                                top="50%" left="78%" width="40%" height="50%">
                                                <BackOfCard
                                                    width="60%" height="80%" top="-15%" left="20%" transform="rotate(90deg)">
                                                </BackOfCard>
                                                <BackOfCard
                                                    width="60%" height="80%" top="35%" left="20%" transform="rotate(90deg)">
                                                </BackOfCard>
                                            </PlayerCardsContainer>
                                        )) :
                                        (
                                            <PlayerCardsContainer
                                                top="50%" left="78%" width="40%" height="50%">
                                                <BackOfCard
                                                    width="60%" height="80%" top="-15%" left="20%" transform="rotate(90deg)">
                                                </BackOfCard>
                                                <BackOfCard
                                                    width="60%" height="80%" top="35%" left="20%" transform="rotate(90deg)">
                                                </BackOfCard>
                                            </PlayerCardsContainer>
                                        )))}

                        </PlayerLeftContainer>
                        <TableComponentsContainer>
                            <TotalPotContainer>Total Pot: {this.game.pot.total}</TotalPotContainer>
                            <MiddleCardsContainer>
                                {this.game.river.cards.length >= 1 ? (
                                    <PictureCardBox
                                        width="9%" height="84%" top="50%" left="68%">
                                        <PlaceHolderCard>{this.game.river.getCard(0)}</PlaceHolderCard>
                                    </PictureCardBox>
                                ) : (<h1></h1>)}
                                {this.game.river.cards.length >= 2 ? (
                                    <PictureCardBox
                                        width="9%" height="84%" top="50%" left="58%">
                                        <PlaceHolderCard>{this.game.river.getCard(1)}</PlaceHolderCard>
                                    </PictureCardBox>
                                ) : (<h1></h1>)}
                                {this.game.river.cards.length >= 3 ? (
                                    <PictureCardBox
                                        width="9%" height="84%" top="50%" left="48%">
                                        <PlaceHolderCard>{this.game.river.getCard(2)}</PlaceHolderCard>
                                    </PictureCardBox>
                                ) : (<h1></h1>)}
                                {this.game.river.cards.length >= 4 ? (
                                    <PictureCardBox
                                        width="9%" height="84%" top="50%" left="38%">
                                        <PlaceHolderCard>{this.game.river.getCard(3)}</PlaceHolderCard>
                                    </PictureCardBox>
                                ) : (<h1></h1>)}
                                {this.game.river.cards.length >= 5 ? (
                                    <PictureCardBox
                                        width="9%" height="84%" top="50%" left="28%">
                                        <PlaceHolderCard>{this.game.river.getCard(4)}</PlaceHolderCard>
                                    </PictureCardBox>
                                ) : (<h1></h1>)}
                            </MiddleCardsContainer>
                            <CallContainer>
                                {this.game.showdown == true ?
                                    (this.myselfUser.username == this.userOnTurn.username ? (
                                        <CallButton onClick={() => {
                                        this.revealCards(true);
                                    }}
                                    >Reveal Cards</CallButton>) :(<h1></h1>)) :
                                    (this.myselfUser.username == this.userOnTurn.username ? (
                                        <CallButton onClick={() => {
                                        this.call();
                                    }}
                                                 disabled={this.displayHowMuchCall(this.myselfUser) == 0}
                                    >Call {this.displayHowMuchCall(this.myselfUser)}</CallButton>) : (<h1></h1>))}
                            </CallContainer>
                            {this.game.showdown ?
                                (this.myselfUser.username == this.userOnTurn.username ? (<RaiseContainer>
                                        <CallButton onClick={() => {
                                            this.revealCards(false);
                                        }}
                                        >Don't Reveal Cards</CallButton>
                                    </RaiseContainer>):(<h1></h1>)
                                    ) :
                                (this.myselfUser.username == this.userOnTurn.username ? (
                                    <RaiseContainer>
                                    <RaiseButton onClick={() => {
                                        this.raise();
                                    }} disabled={!this.state.raiseAmount}
                                    >Raise</RaiseButton>
                                    <RaiseInput id = "raiseInputField" type="number" onChange={e => {
                                        this.handleInputChange('raiseAmount', e.target.value);
                                    }}
                                    ></RaiseInput>
                                </RaiseContainer>) : (<h1></h1>))}
                        </TableComponentsContainer>
                        <PlayerRightContainer>
                            {this.user4.blind == "BIG" ?
                                (<BigBlind top="80%" left="15%" transform="rotate(270deg)">B</BigBlind>) :
                                (<h1></h1>)}
                            {this.user4.blind == "SMALL" ?
                                (<SmallBlind top="80%" left="15%" transform="rotate(270deg)">S</SmallBlind>) :
                                (<h1></h1>)}
                            {this.user4.inGame ? (
                                this.user4.username == this.userOnTurn.username ? (
                                <PlayerInfoContainer
                                    top="11.5%" left="25%" width="115%" height="19%" color="red"
                                    background="grey" padding="0 90px 0 10px" borderradius="10px"
                                    className = "infobox">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    {this.displayUser(this.user4)}
                                </PlayerInfoContainer>
                            ) : (
                                <PlayerInfoContainer
                                    top="11.5%" left="25%" width="115%" height="19%" color="white" background="grey"
                                    padding="0 90px 0 10px" borderradius="10px" border="solid white 1px">
                                    {this.displayUser(this.user4)}
                                </PlayerInfoContainer>
                            )) : (null)}
                            {this.user4.inGame ? (
                                this.user4.username == this.userOnTurn.username ? (
                                <ProfileCircle
                                    top="2%" left="60%" bordercolor="red">
                                    {this.returnProfilePicture(this.game, this.user4)}
                                </ProfileCircle>
                            ) : (
                                <ProfileCircle
                                    top="2%" left="60%" bordercolor="white">
                                    {this.returnProfilePicture(this.game, this.user4)}
                                </ProfileCircle>
                            )) : (null)}
                            {!this.user4.inGame ? (null) : (
                                this.user4.folded ? (null) : (
                                    this.game.showdown ?
                                        (this.getUserCard(this.showdownUser4, 0) ? (
                                                <PlayerCardsContainer
                                                    top="50%" left="22%" width="40%" height="50%">
                                                    <PictureCardBox
                                                        width="60%" height="80%" top="-15%" left="20%" transform="rotate(270deg)">
                                                        <PlaceHolderCard>{this.getUserCard(this.showdownUser4, 0)}
                                                        </PlaceHolderCard>
                                                    </PictureCardBox>
                                                    <PictureCardBox
                                                        width="60%" height="80%" top="35%" left="20%" transform="rotate(270deg)">
                                                        <PlaceHolderCard>
                                                            {this.getUserCard(this.showdownUser4, 1)}
                                                        </PlaceHolderCard>
                                                    </PictureCardBox>
                                                </PlayerCardsContainer>
                                        ) : (
                                            <PlayerCardsContainer
                                                top="50%" left="22%" width="40%" height="50%">
                                                <BackOfCard
                                                    width="60%" height="80%" top="-15%" left="20%" transform="rotate(270deg)">
                                                </BackOfCard>
                                                <BackOfCard
                                                    width="60%" height="80%" top="35%" left="20%" transform="rotate(270deg)">
                                                </BackOfCard>
                                            </PlayerCardsContainer>
                                        )) :
                                        (
                                            <PlayerCardsContainer
                                                top="50%" left="22%" width="40%" height="50%">
                                                <BackOfCard
                                                    width="60%" height="80%" top="-15%" left="20%" transform="rotate(270deg)">
                                                </BackOfCard>
                                                <BackOfCard
                                                    width="60%" height="80%" top="35%" left="20%" transform="rotate(270deg)">
                                                </BackOfCard>
                                            </PlayerCardsContainer>
                                        )))}

                        </PlayerRightContainer>
                    </MiddleContainer>
                    <LowerContainer>
                        <ChatContainer>
                            <InnerTextChatContainer>
                                <TextBacklogChatContainer id = 'chatList'>
                                    {!this.state.chatLog ? (<h1></h1>) : (
                                        this.state.chatLog.map(ChatMessage => {
                                                return (
                                                    <ChatMessageField ChatMessage={ChatMessage}/>
                                                );
                                        }))}
                                </TextBacklogChatContainer>
                                <ChatInputField id = "chatInputField"
                                                placeholder="Type in your message"
                                                onChange={e => {
                                                    this.handleInputChange('chatMessage', e.target.value);}}
                                                onKeyPress={this.enterPressed.bind(this)}
                                                >
                                </ChatInputField>
                                <EmojiButton
                                    onClick={() => {
                                        var x = document.getElementById("EmojiContainer")
                                        if(window.getComputedStyle(x).display === "none"){
                                            document.getElementById("EmojiContainer").style.display = 'inline'}
                                        else{
                                            document.getElementById("EmojiContainer").style.display = 'none'
                                        }
                                }}
                                >😀</EmojiButton>
                                <EmojiContainer id = "EmojiContainer">
                                    <SingleEmojiButton
                                        onClick={() => {
                                            this.addEmoji("😃");
                                        }}
                                    >
                                        😃
                                    </SingleEmojiButton>
                                    <SingleEmojiButton
                                        onClick={() => {
                                            this.addEmoji("🤑");
                                        }}>
                                        🤑
                                    </SingleEmojiButton>
                                    <SingleEmojiButton
                                        onClick={() => {
                                            this.addEmoji("🥱");
                                        }}>
                                        🥱
                                    </SingleEmojiButton>
                                    <SingleEmojiButton
                                        onClick={() => {
                                            this.addEmoji("😴");
                                        }}>
                                        😴
                                    </SingleEmojiButton>
                                    <SingleEmojiButton
                                        onClick={() => {
                                            this.addEmoji("😜");
                                        }}>
                                        😜
                                    </SingleEmojiButton>
                                    <SingleEmojiButton
                                        onClick={() => {
                                            this.addEmoji("🤪");
                                        }}>
                                        🤪
                                    </SingleEmojiButton>
                                    <SingleEmojiButton
                                        onClick={() => {
                                            this.addEmoji("😢");
                                        }}>
                                        😢
                                    </SingleEmojiButton>
                                    <SingleEmojiButton
                                        onClick={() => {
                                            this.addEmoji("😭");
                                        }}>
                                        😭
                                    </SingleEmojiButton>
                                    <SingleEmojiButton
                                        onClick={() => {
                                            this.addEmoji("😤");
                                        }}>
                                        😤
                                    </SingleEmojiButton>
                                    <SingleEmojiButton
                                        onClick={() => {
                                            this.addEmoji("🤢");
                                        }}>
                                        🤢
                                    </SingleEmojiButton>
                                    <SingleEmojiButton
                                        onClick={() => {
                                            this.addEmoji("🤮");
                                        }}>
                                        🤮
                                    </SingleEmojiButton>
                                    <SingleEmojiButton
                                        onClick={() => {
                                            this.addEmoji("🤬");
                                        }}>
                                        🤬
                                    </SingleEmojiButton>
                                    <SingleEmojiButton
                                        onClick={() => {
                                            this.addEmoji("🤯");
                                        }}>
                                        🤯
                                    </SingleEmojiButton>
                                    <SingleEmojiButton
                                        onClick={() => {
                                            this.addEmoji("🥳");
                                        }}>
                                        🥳
                                    </SingleEmojiButton>
                                    <SingleEmojiButton
                                        onClick={() => {
                                            this.addEmoji("👨‍🎓");
                                        }}>
                                        👨‍🎓
                                    </SingleEmojiButton>
                                    <SingleEmojiButton
                                        onClick={() => {
                                            this.addEmoji("🤵");
                                        }}>
                                        🤵
                                    </SingleEmojiButton>
                                    <SingleEmojiButton
                                        onClick={() => {
                                            this.addEmoji("👨🏻‍💻");
                                        }}>
                                        👨🏻‍💻
                                    </SingleEmojiButton>
                                    <SingleEmojiButton
                                        onClick={() => {
                                            this.addEmoji("🤡");
                                        }}>
                                        🤡
                                    </SingleEmojiButton>
                                    <SingleEmojiButton
                                        onClick={() => {
                                            this.addEmoji("👽");
                                        }}>
                                        👽
                                    </SingleEmojiButton>
                                    <SingleEmojiButton
                                        onClick={() => {
                                            this.addEmoji("💩");
                                        }}>
                                        💩
                                    </SingleEmojiButton>
                                </EmojiContainer>
                                <ChatSendButton
                                    id = "chatButton"
                                    disabled={!this.state.chatMessage}
                                    onClick={() => {
                                    this.sendMessage();
                                }}>
                                    Send
                                </ChatSendButton>
                            </InnerTextChatContainer>
                        </ChatContainer>
                        {this.myselfUser.blind == "BIG" ?
                            (<BigBlind top="-10%" left="49%">B</BigBlind>) :
                            (<h1></h1>)}
                        {this.myselfUser.blind == "SMALL" ?
                            (<SmallBlind top="-10%" left="49%">S</SmallBlind>) :
                            (<h1></h1>)}
                        <CheckContainer>
                            {this.game.showdown == true ?
                                (<h1></h1>) :
                                (this.myselfUser.username == this.userOnTurn.username ? (
                                    <CheckButton onClick={() => {
                                        this.check();
                                    }}
                                              disabled={this.displayHowMuchCall(this.myselfUser) != 0}>Check</CheckButton>
                                ) : (<h1></h1>))}
                        </CheckContainer>
                        {this.myselfUser.cards.length == 0 ? (<h1></h1>) : (
                            this.myselfUser.folded ? (
                                <OwnCardsContainer>
                                </OwnCardsContainer>
                            ) : (
                            <OwnCardsContainer>
                                <PictureCardBox
                                    width="35%" height="90%" top="50%" left="28%">
                                    <PlaceHolderCard>{new Card(this.myselfUser.cards[0]).card}</PlaceHolderCard>
                                </PictureCardBox>
                                <PictureCardBox
                                    width="35%" height="90%" top="50%" left="72%">
                                    <PlaceHolderCard>{new Card(this.myselfUser.cards[1]).card}</PlaceHolderCard>
                                </PictureCardBox>
                            </OwnCardsContainer>
                            ))}
                        <FoldContainer>
                            {this.game.showdown == true ?
                                (<h1></h1>) :
                                (this.myselfUser.username == this.userOnTurn.username ? (
                                    <FoldButton onClick={() => {
                                    this.fold();
                                }}>Fold</FoldButton>) : (<h1></h1>))}
                        </FoldContainer>
                        <LeaveTableContainer>
                            <LeaveTableButton onClick={() => {
                                this.leaveTable()
                            }}>
                                Leave Table
                            </LeaveTableButton>
                            <CombinationButton onClick={() => {
                                this.showCombinations()
                            }}>Poker Hands hide/show</CombinationButton>
                            {this.combinations}


                        </LeaveTableContainer>
                    </LowerContainer>
                    {this.myselfUser.username == this.userOnTurn.username ?
                        (<BottomContainer className = "infobox">
                            <span></span>
                            <PlayerInfoContainer
                                top="50%" left="55%" width="30%" height="80%" color="red" backgroundimage="none" boxShadow = "none">
                                {this.displayUser(this.myselfUser)}
                            </PlayerInfoContainer>
                            <ProfileCircle
                                top="-120%" left="30%" bordercolor="red">
                                {this.returnProfilePicture(this.game, this.myselfUser)}
                            </ProfileCircle>
                            <SpotifyContainerInGame>
                                <SpotifyPlayer spotifyPlayer={this.props.spotifyPlayer}
                                setSpotifyPlayer={this.props.setSpotifyPlayer}/>
                            </SpotifyContainerInGame>
                        </BottomContainer>) :
                        (<BottomContainer bordercolor="solid 2px white">
                            <PlayerInfoContainer
                                top="50%" left="55%" width="30%" height="80%" color="white" backgroundimage="none" boxShadow = "none">
                                {this.displayUser(this.myselfUser)}
                            </PlayerInfoContainer>
                            <ProfileCircle
                                top="-120%" left="30%" bordercolor="white">
                                {this.returnProfilePicture(this.game, this.myselfUser)}
                            </ProfileCircle>
                            <SpotifyContainerInGame>
                                <SpotifyPlayer spotifyPlayer={this.props.spotifyPlayer}
                                setSpotifyPlayer={this.props.setSpotifyPlayer}/>
                            </SpotifyContainerInGame>
                        </BottomContainer>)}
                </GameContainer>);
        }

        //If Game did not start yet
        else {
            return (

                <LoadingGameContainer> LOADING <Loader top='360px' left='57%'>500</Loader> </LoadingGameContainer>)
        }
    }
}

export default withRouter(GameScreen);
