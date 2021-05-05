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
    Writen,
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
    CardBox,
    PlayerInfoContainer,
    FrontCardBox,
    LoadingGameContainer, LeaveTableButtonEndScreen, LooserPicture, LooserContainer, ChatSendButton
} from "../../views/design/GameScreenStyle";
import Player from "../../views/Player";
import ChatMessageField from "../../views/ChatMessageField";
import {Spinner} from "../../views/design/Spinner";

document.body.style.backgroundColor = "green";

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

    async fetchChat() {
        const response = await api.get("/games/1/" + localStorage.getItem('userID') + "/chats", {headers: {Authorization: localStorage.getItem('token')}});
        this.setState({chatLog: response.data});
    }

    async call() {
        await api.put("/games/1/" + localStorage.getItem('userID') + "/call", this.returnToken())
    }

    async check() {
        await api.put("/games/1/" + localStorage.getItem('userID') + "/check", this.returnToken())
    }

    async fold() {
        await api.put("/games/1/" + localStorage.getItem('userID') + "/fold", this.returnToken())
    }

    async raise() {
        await api.put("/games/1/" + localStorage.getItem('userID') + "/raise", this.returnRaiseAmountAndToken())
        this.state.raiseAmount = null;
        document.getElementById("raiseInputField").value = "";
    }

    async sendMessage(){
        await api.put("/games/1/" + localStorage.getItem('userID') + "/chats", this.returnChatMessageAndToken())
        this.state.chatMessage = null;
        document.getElementById("chatInputField").value = "";
    }

    async showdown() {
        const showdown = await api.get('/games/1/showdown', {headers: {Authorization: localStorage.getItem('token')}})
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
        const requestBody = JSON.stringify({
            token: localStorage.getItem('token')
        });
        return requestBody
    }

    returnRaiseAmountAndToken() {
        const requestBodyRaiseAmount = JSON.stringify({
            raiseAmount: this.state.raiseAmount,
            token: localStorage.getItem('token')
        });
        return requestBodyRaiseAmount
    }

    returnChatMessageAndToken() {
        const requestBodyChatMessage = JSON.stringify({
            token: localStorage.getItem('token'),
            message: this.state.chatMessage
        });
        return requestBodyChatMessage
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        this.props.history.push('/login');
    }

    async logoutEndGame() {
        await api.put('/users/' + localStorage.getItem('userID') + '/logout', this.returnToken())
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        this.props.history.push('/login');
        this.gameEnd = false;
    }


    returnTokenAndIfReveal(boolean) {
        const requestBodyRevealCards = JSON.stringify({
            token: localStorage.getItem('token'),
            wantsToShow: boolean
        });
        return requestBodyRevealCards
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
        await api.put('/games/1/' + localStorage.getItem('userID') + '/show', this.returnTokenAndIfReveal(boolean));
    }

    lostPlayersCounter = null;
    gameEnd = false;
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


    async updateGameScreen() {

        if (this.game.showdown == true) {
            this.showdown();
        }

        if (this.game.showdown == false) {
            this.showdownUser1 = new User();
            this.showdownUser2 = new User();
            this.showdownUser3 = new User();
            this.showdownUser4 = new User();
        }

        if (this.game.gameName != null) {
            await this.fetchChat();
        }

        const gameResponse = await api.get('/games/1', {headers: {Authorization: localStorage.getItem('token')}});
        this.game = new Game(gameResponse.data);


        const myselfUserResponse = await api.get('/games/1/' + localStorage.getItem('userID'), {headers: {Authorization: localStorage.getItem('token')}});
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
                                this.logoutEndGame()

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
                                this.logoutEndGame()

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
                            {this.user2.username == this.userOnTurn.username ? (
                                <PlayerInfoContainer
                                    top="27.5%" left="62.5%" width="50%" height="30%" color="red" background="grey"
                                    padding="0 0 0 90px" borderradius="10px" border="solid white 1px">
                                    {this.displayUser(this.user2)}
                                </PlayerInfoContainer>
                            ) : (
                                <PlayerInfoContainer
                                    top="27.5%" left="62.5%" width="50%" height="30%" color="white" background="grey"
                                    padding="0 0 0 90px" borderradius="10px" border="solid white 1px">
                                    {this.displayUser(this.user2)}
                                </PlayerInfoContainer>
                            )
                            };
                            {this.user2.username == this.userOnTurn.username ? (
                                <ProfileCircle
                                    top="12.5%" left="30%" bordercolor = "red"
                                    background='url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user1.jpg")'></ProfileCircle>
                            ) : (
                                <ProfileCircle
                                    top="12.5%" left="30%" bordercolor = "white"
                                    background='url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user1.jpg")'></ProfileCircle>
                            )
                            };
                            {this.user2.blind == "BIG" ?
                                (<BigBlind
                                    top="70%" left="75%" transform="rotate(180deg)">B</BigBlind>) :
                                (<h1></h1>)}
                            {this.user2.blind == "SMALL" ?
                                (<SmallBlind top="70%" left="75%" transform="rotate(180deg)">S</SmallBlind>) :
                                (<h1></h1>)}
                            <PlayerCardsContainer
                                top="72.5%" left="60%" width="30%" height="55%">
                                <CardBox
                                    width="30%" top="0" left="29%" height="100%" transform="rotate(180deg)">
                                    <FrontCardBox>
                                        {this.game.showdown == true ?
                                            (this.getUserCard(this.showdownUser2, 0)) :
                                            (<h1></h1>)}
                                    </FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="30%" top="0" left="61%" height="100%" transform="rotate(180deg)">
                                    <FrontCardBox>
                                        {this.game.showdown == true ?
                                            (this.getUserCard(this.showdownUser2, 1)) :
                                            (<h1></h1>)}
                                    </FrontCardBox>
                                </CardBox>
                            </PlayerCardsContainer>
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
                                    top="27.5%" left="23.5%" width="50%" height="30%" color="red"
                                    background="grey" padding="0 90px 0 10px" borderradius="10px" border="solid white 1px">
                                    {this.displayUser(this.user3)}
                                </PlayerInfoContainer>
                            ) : (
                                <PlayerInfoContainer
                                    top="27.5%" left="23.5%" width="50%" height="30%" color="white"
                                    background="grey" padding="0 90px 0 10px" borderradius="10px" border="solid white 1px">
                                    {this.displayUser(this.user3)}
                                </PlayerInfoContainer>
                            )
                            };
                            {this.user3.username == this.userOnTurn.username ? (
                                <ProfileCircle
                                    top="12.5%" left="40%" bordercolor = "red"
                                    background='url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user2.jpg")'></ProfileCircle>
                            ) : (
                                <ProfileCircle
                                    top="12.5%" left="40%" bordercolor = "white"
                                    background='url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user2.jpg")'></ProfileCircle>
                            )};
                            <PlayerCardsContainer
                                top="72.5%" left="20%" width="30%" height="55%">
                                <CardBox
                                    width="30%" top="0" left="29%" height="100%" transform="rotate(180deg)">
                                    <FrontCardBox>
                                        {this.game.showdown == true ?
                                            (this.getUserCard(this.showdownUser3, 0)) :
                                            (<h1></h1>)}
                                    </FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="30%" top="0" left="61%" height="100%" transform="rotate(180deg)">
                                    <FrontCardBox>
                                        {this.game.showdown == true ?
                                            (this.getUserCard(this.showdownUser3, 1)) :
                                            (<h1></h1>)}
                                    </FrontCardBox>
                                </CardBox>
                            </PlayerCardsContainer>
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
                            {this.user1.username == this.userOnTurn.username ? (
                                <PlayerInfoContainer
                                    top="11.5%" left="75%" width="115%" height="19%" color="red"
                                    background="grey" padding="0 0 0 90px"
                                    borderradius="10px" border="solid white 1px">
                                    {this.displayUser(this.user1)}
                                </PlayerInfoContainer>
                            ) : (
                                <PlayerInfoContainer
                                    top="11.5%" left="75%" width="115%" height="19%" color="white"
                                    background="grey" padding="0 0 0 90px"
                                    borderradius="10px" border="solid white 1px">
                                    {this.displayUser(this.user1)}
                                </PlayerInfoContainer>
                            )};
                            {this.user1.username == this.userOnTurn.username ? (
                                <ProfileCircle
                                    top="2%" left="0%" bordercolor = "red"
                                    background='url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user3.jpg")'></ProfileCircle>
                            ) : (
                                <ProfileCircle
                                    top="2%" left="0%" bordercolor = "white"
                                    background='url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user3.jpg")'></ProfileCircle>
                            )
                            };
                            <PlayerCardsContainer
                                top="50%" left="78%" width="40%" height="50%">
                                <CardBox
                                    width="60%" height="80%" top="-15%" left="20%" transform="rotate(90deg)">
                                    <FrontCardBox>
                                        {this.game.showdown == true ?
                                            (this.getUserCard(this.showdownUser1, 0)) :
                                            (<h1></h1>)}
                                    </FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="60%" height="80%" top="35%" left="20%" transform="rotate(90deg)">
                                    <FrontCardBox>
                                        {this.game.showdown == true ?
                                            (this.getUserCard(this.showdownUser1, 1)) :
                                            (<h1></h1>)}
                                    </FrontCardBox>
                                </CardBox>
                            </PlayerCardsContainer>
                        </PlayerLeftContainer>
                        <TableComponentsContainer>
                            <TotalPotContainer>Total Pot: {this.game.pot.total}</TotalPotContainer>
                            <MiddleCardsContainer>
                                {this.game.river.cards.length >= 1 ? (
                                    <CardBox
                                        width="9%" height="80%" top="50%" left="68%">
                                        <FrontCardBox>{this.game.river.getCard(0)}</FrontCardBox>
                                    </CardBox>
                                ) : (<h1></h1>)}
                                {this.game.river.cards.length >= 2 ? (
                                    <CardBox
                                        width="9%" height="80%" top="50%" left="58%">
                                        <FrontCardBox>{this.game.river.getCard(1)}</FrontCardBox>
                                    </CardBox>
                                ) : (<h1></h1>)}
                                {this.game.river.cards.length >= 3 ? (
                                    <CardBox
                                        width="9%" height="80%" top="50%" left="48%">
                                        <FrontCardBox>{this.game.river.getCard(2)}</FrontCardBox>
                                    </CardBox>
                                ) : (<h1></h1>)}
                                {this.game.river.cards.length >= 4 ? (
                                    <CardBox
                                        width="9%" height="80%" top="50%" left="38%">
                                        <FrontCardBox>{this.game.river.getCard(3)}</FrontCardBox>
                                    </CardBox>
                                ) : (<h1></h1>)}
                                {this.game.river.cards.length >= 5 ? (
                                    <CardBox
                                        width="9%" height="80%" top="50%" left="28%">
                                        <FrontCardBox>{this.game.river.getCard(4)}</FrontCardBox>
                                    </CardBox>
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
                            {this.game.showdown == true ?
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
                            {this.user4.username == this.userOnTurn.username ? (
                                <PlayerInfoContainer
                                    top="11.5%" left="25%" width="115%" height="19%" color="red"
                                    background="grey" padding="0 90px 0 10px" borderradius="10px"
                                    border="solid white 1px">
                                    {this.displayUser(this.user4)}
                                </PlayerInfoContainer>
                            ) : (
                                <PlayerInfoContainer
                                    top="11.5%" left="25%" width="115%" height="19%" color="white" background="grey"
                                    padding="0 90px 0 10px" borderradius="10px" border="solid white 1px">
                                    {this.displayUser(this.user4)}
                                </PlayerInfoContainer>
                            )}
                            {this.user4.username == this.userOnTurn.username ? (
                                <ProfileCircle
                                    top="2%" left="60%" bordercolor="red"
                                    background='url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user4.jpg")'></ProfileCircle>
                            ) : (
                                <ProfileCircle
                                    top="2%" left="60%" bordercolor="white"
                                    background='url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user4.jpg")'></ProfileCircle>
                            )}
                            <PlayerCardsContainer
                                top="50%" left="22%" width="40%" height="50%">
                                <CardBox
                                    width="60%" height="80%" top="-15%" left="20%" transform="rotate(270deg)">
                                    <FrontCardBox>{this.game.showdown == true ?
                                        (this.getUserCard(this.showdownUser4, 0)) :
                                        (<h1></h1>)}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="60%" height="80%" top="35%" left="20%" transform="rotate(270deg)">
                                    <FrontCardBox>
                                        {this.game.showdown == true ?
                                            (this.getUserCard(this.showdownUser4, 1)) :
                                            (<h1></h1>)}
                                    </FrontCardBox>
                                </CardBox>
                            </PlayerCardsContainer>
                        </PlayerRightContainer>
                    </MiddleContainer>
                    <LowerContainer>
                        <ChatContainer>
                            <InnerTextChatContainer>
                                <TextBacklogChatContainer>
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
                                                >
                                </ChatInputField>
                                <ChatSendButton onClick={() => {
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
                            <OwnCardsContainer>
                                <CardBox
                                    width="35%" height="80%" top="50%" left="28%">
                                    <FrontCardBox>{new Card(this.myselfUser.cards[0]).card}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="35%" height="80%" top="50%" left="72%">
                                    <FrontCardBox>{new Card(this.myselfUser.cards[1]).card}</FrontCardBox>
                                </CardBox>
                            </OwnCardsContainer>
                        )}

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
                                this.logout()
                            }}>
                                Leave Table
                            </LeaveTableButton>
                        </LeaveTableContainer>
                    </LowerContainer>
                    {this.myselfUser.username == this.userOnTurn.username ?
                        (<BottomContainer bordercolor="red">
                            <PlayerInfoContainer
                                top="50%" left="55%" width="30%" height="80%" color="red">
                                {this.displayUser(this.myselfUser)}
                            </PlayerInfoContainer>
                            <ProfileCircle
                                top="-120%" left="30%" bordercolor="red"
                                background='url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user5.jpg")'></ProfileCircle>
                        </BottomContainer>) :
                        (<BottomContainer bordercolor="white">
                            <PlayerInfoContainer
                                top="50%" left="55%" width="30%" height="80%" color="white">
                                {this.displayUser(this.myselfUser)}
                            </PlayerInfoContainer>
                            <ProfileCircle
                                top="-120%" left="30%" bordercolor="white"
                                background='url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user5.jpg")'></ProfileCircle>
                        </BottomContainer>)}
                </GameContainer>);
        }

        //If Game did not start yet
        else {
            return (
                <LoadingGameContainer> LOADING <Loader top='360px' left='77%'>500</Loader> Game will start when 5 people
                    joined</LoadingGameContainer>)
        }
    }
}

export default withRouter(GameScreen);
