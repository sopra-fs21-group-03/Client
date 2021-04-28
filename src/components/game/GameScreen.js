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
    LoadingGameContainer, LeaveTableButtonEndScreen, LooserPicture, LooserContainer
} from "../../views/design/GameScreenStyle";
import Player from "../../views/Player";
import ChatMessageField from "../../views/ChatMessageField";

document.body.style.backgroundColor = "green";

//Normal PokerScreen
class GameScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            token: null,
            raiseAmount: null,
            chatLog: null
        };
    }

    async fetchChat() {
        const response = await api.get("/games/1/" + localStorage.getItem('userID') + "/chats", {headers: {Authorization: localStorage.getItem('token')}});
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.setState({chatLog: response.data});
    }

    async call() {
        this.returnToken()
        await api.put("/games/1/" + localStorage.getItem('userID') + "/call", this.returnToken())
    }

    async check() {
        this.returnToken()
        await api.put("/games/1/" + localStorage.getItem('userID') + "/check", this.returnToken())
    }

    async fold() {
        this.returnToken()
        await api.put("/games/1/" + localStorage.getItem('userID') + "/fold", this.returnToken())
    }

    async raise() {
        this.returnToken()
        await api.put("/games/1/" + localStorage.getItem('userID') + "/raise", this.returnRaiseAmountAndToken())
        this.state.raiseAmount = null;
    }

    async showdown() {
        const showdown = await api.get('/games/1/showdown', {headers: {Authorization: localStorage.getItem('token')}})
        const playerList = showdown.data;
        console.log(playerList);
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
        console.log(requestBody)
        return requestBody
    }

    returnRaiseAmountAndToken() {
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


    returnTokenAndIfReveal(boolean) {
        const requestBodyRevealCards = JSON.stringify({
            token: localStorage.getItem('token'),
            wantsToShow: boolean
        });
        console.log(requestBodyRevealCards)
        return requestBodyRevealCards
    }

    displayUser(user) {
        let maxBet = 0
        for (let i = 1; i < 6; i++) {
            if (this.game.pot.contribution[i.toString()] > maxBet) {
                maxBet = this.game.pot.contribution[i.toString()]
            }
        }
        return <DisplayUserInfo>{user.username} Money : {user.money} <br></br> Betting : {user.moneyInPot} Missing
            : {maxBet - user.moneyInPot}</DisplayUserInfo>;
    }

    displayHowMuchCall(user) {
        let maxBet = 0
        for (let i = 1; i < 6; i++) {
            if (this.game.pot.contribution[i.toString()] > maxBet) {
                maxBet = this.game.pot.contribution[i.toString()]
            }
        }
        return maxBet - user.moneyInPot;
    }

    async revealCards(boolean) {
        await api.put('/games/1/' + localStorage.getItem('userID') + '/show', this.returnTokenAndIfReveal(boolean));
    }

    lostPlayersCounter = null;
    gameEnd = null;
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
        if (this.game.gameName != null) {
            await this.fetchChat();
        }

        this.lostPlayersCounter = 0


        const gameResponse = await api.get('/games/1', {headers: {Authorization: localStorage.getItem('token')}});
        this.game = gameResponse.data;


        const myselfUserResponse = await api.get('/games/1/' + localStorage.getItem('userID'), {headers: {Authorization: localStorage.getItem('token')}});
        this.myselfUser = myselfUserResponse.data;
        if (this.game.players.length == 5) {
            this.userOnTurn = this.game.onTurn;

            for (var i = 0; i < 5; i++) {
                if (this.game.players[i].username == this.myselfUser.username) {
                    this.myselfUser.moneyInPot = this.game.pot.contribution[(i + 1).toString()]
                    this.user4 = this.game.players[(i + 1) % 5]
                    this.user4.moneyInPot = this.game.pot.contribution[((i + 1) % 5 + 1).toString()]
                    this.user3 = this.game.players[(i + 2) % 5]
                    this.user3.moneyInPot = this.game.pot.contribution[((i + 2) % 5 + 1).toString()]
                    this.user2 = this.game.players[(i + 3) % 5]
                    this.user2.moneyInPot = this.game.pot.contribution[((i + 3) % 5 + 1).toString()]
                    this.user1 = this.game.players[(i + 4) % 5]
                    this.user1.moneyInPot = this.game.pot.contribution[((i + 4) % 5 + 1).toString()]
                }
                if (this.game.players[i].money == 0 && this.game.pot.contribution[(i + 1).toString()] == 0) {
                    this.lostPlayersCounter = this.lostPlayersCounter + 1;
                    if (this.lostPlayersCounter == 4) {
                        this.gameEnd = true;
                    }

                }

            }
        }


        //If to display reveal Cards Button

        if (document.getElementById("notRevealButton") != null) {
            if (this.myselfUser.username != this.userOnTurn.username) {
                document.getElementById("notRevealButton").style.display = "none";
                document.getElementById("revealButton").style.display = "none";
            }

            if (this.myselfUser.username == this.userOnTurn.username) {
                document.getElementById("notRevealButton").style.display = "inline";
                document.getElementById("revealButton").style.display = "inline";
            }
        }

        //From here GameUpdate it is only style stuff (display etc)


        if (document.getElementById("player1InfoOnTurnShowdown") != null
            && this.user1.username != null && this.userOnTurn.username != null
        ) {
            if (this.user1.username == this.userOnTurn.username) {
                document.getElementById("player1InfoOnTurnShowdown").style.color = "red";
            }
            if (this.user1.username != this.userOnTurn.username) {
                document.getElementById("player1InfoOnTurnShowdown").style.color = "white";
            }
        }

        if (document.getElementById("player2InfoOnTurnShowdown") != null
            && this.user2.username != null && this.userOnTurn.username != null
        ) {
            if (this.user2.username == this.userOnTurn.username) {
                document.getElementById("player2InfoOnTurnShowdown").style.color = "red";
            }
            if (this.user2.username != this.userOnTurn.username) {
                document.getElementById("player2InfoOnTurnShowdown").style.color = "white";
            }
        }

        if (document.getElementById("player3InfoOnTurnShowdown") != null
            && this.user3.username != null && this.userOnTurn.username != null
        ) {
            if (this.user3.username == this.userOnTurn.username) {
                document.getElementById("player3InfoOnTurnShowdown").style.color = "red";
            }
            if (this.user3.username != this.userOnTurn.username) {
                document.getElementById("player3InfoOnTurnShowdown").style.color = "white";
            }
        }

        if (document.getElementById("player4InfoOnTurnShowdown") != null
            && this.user4.username != null && this.userOnTurn.username != null
        ) {
            if (this.user4.username == this.userOnTurn.username) {
                document.getElementById("player4InfoOnTurnShowdown").style.color = "red";
            }
            if (this.user4.username != this.userOnTurn.username) {
                document.getElementById("player4InfoOnTurnShowdown").style.color = "white";
            }
        }

        if (document.getElementById("playerOwnInfoOnTurnShowdown") != null
            && this.myselfUser.username != null && this.userOnTurn.username != null
        ) {
            if (this.myselfUser.username == this.userOnTurn.username) {
                document.getElementById("playerOwnInfoOnTurnShowdown").style.color = "red";
            }
            if (this.myselfUser.username != this.userOnTurn.username) {
                document.getElementById("playerOwnInfoOnTurnShowdown").style.color = "white";
            }
        }


        if (document.getElementById("callButton") != null) {    //Buttons should only display when player on Turn
            if (this.myselfUser.username != this.userOnTurn.username) {
                document.getElementById("callButton").style.display = "none";
                document.getElementById("raiseButton").style.display = "none";
                document.getElementById("raiseInput").style.display = "none";
                document.getElementById("checkButton").style.display = "none";
                document.getElementById("foldButton").style.display = "none";
            }

            if (this.myselfUser.username == this.userOnTurn.username) {
                document.getElementById("callButton").style.display = "inline";
                document.getElementById("raiseButton").style.display = "inline";
                document.getElementById("raiseInput").style.display = "inline";
                document.getElementById("checkButton").style.display = "inline";
                document.getElementById("foldButton").style.display = "inline";
            }

            //RiverCards will not be displayed when there is none
            if (this.game.river.cards.length >= 1) {
                document.getElementById("riverCard0").style.display = "inline";
            }

            if (this.game.river.cards.length >= 2) {
                document.getElementById("riverCard1").style.display = "inline";
            }

            if (this.game.river.cards.length >= 3) {
                document.getElementById("riverCard2").style.display = "inline";
            }

            if (this.game.river.cards.length >= 4) {
                document.getElementById("riverCard3").style.display = "inline";
            }

            if (this.game.river.cards.length >= 5) {
                document.getElementById("riverCard4").style.display = "inline";
            }

            if (this.game.river.cards.length < 1) {
                document.getElementById("riverCard0").style.display = "none";
            }

            if (this.game.river.cards.length < 2) {
                document.getElementById("riverCard1").style.display = "none";
            }

            if (this.game.river.cards.length < 3) {
                document.getElementById("riverCard2").style.display = "none";
            }

            if (this.game.river.cards.length < 4) {
                document.getElementById("riverCard3").style.display = "none";
            }

            if (this.game.river.cards.length < 5) {
                document.getElementById("riverCard4").style.display = "none";
            }

            //not turn: if play.self has no cards, there should be no card displayed
            if (document.getElementById("ownCardBox1") != null
                && document.getElementById("ownCardBox2") != null) {
                if (this.myselfUser.cards.length == 0) {
                    document.getElementById("ownCardBox1").style.display = "none";
                    document.getElementById("ownCardBox2").style.display = "none";
                }
                if (this.myselfUser.cards.length == 2) {
                    document.getElementById("ownCardBox1").style.display = "inline";
                    document.getElementById("ownCardBox2").style.display = "inline";
                }
            }

            //If User is on turn his name should display in red

            if (document.getElementById("player1InfoOnTurn") != null
                && this.user1.username != null && this.userOnTurn.username != null
            ) {
                if (this.user1.username == this.userOnTurn.username) {
                    document.getElementById("player1InfoOnTurn").style.color = "red";
                }
                if (this.user1.username != this.userOnTurn.username) {
                    document.getElementById("player1InfoOnTurn").style.color = "white";
                }
            }

            if (document.getElementById("player2InfoOnTurn") != null
                && this.user2.username != null && this.userOnTurn.username != null
            ) {
                if (this.user2.username == this.userOnTurn.username) {
                    document.getElementById("player2InfoOnTurn").style.color = "red";
                }
                if (this.user2.username != this.userOnTurn.username) {
                    document.getElementById("player2InfoOnTurn").style.color = "white";
                }
            }

            if (document.getElementById("player3InfoOnTurn") != null
                && this.user3.username != null && this.userOnTurn.username != null
            ) {
                if (this.user3.username == this.userOnTurn.username) {
                    document.getElementById("player3InfoOnTurn").style.color = "red";
                }
                if (this.user3.username != this.userOnTurn.username) {
                    document.getElementById("player3InfoOnTurn").style.color = "white";
                }
            }

            if (document.getElementById("player4InfoOnTurn") != null
                && this.user4.username != null && this.userOnTurn.username != null
            ) {
                if (this.user4.username == this.userOnTurn.username) {
                    document.getElementById("player4InfoOnTurn").style.color = "red";
                }
                if (this.user4.username != this.userOnTurn.username) {
                    document.getElementById("player4InfoOnTurn").style.color = "white";
                }
            }

            if (document.getElementById("playerOwnUserInfoOnTurn") != null
                && this.myselfUser.username != null && this.userOnTurn.username != null
            ) {
                if (this.myselfUser.username == this.userOnTurn.username) {
                    document.getElementById("playerOwnUserInfoOnTurn").style.color = "red";
                }
                if (this.myselfUser.username != this.userOnTurn.username) {
                    document.getElementById("playerOwnUserInfoOnTurn").style.color = "white";
                }
            }

            //If display blinds
            if (this.user1.blind == "SMALL") {
                document.getElementById("1S").style.display = "inline";
                document.getElementById("1B").style.display = "none";
            }
            if (this.user1.blind == "BIG") {
                document.getElementById("1S").style.display = "none";
                document.getElementById("1B").style.display = "inline";
            }
            if (this.user1.blind == "NEUTRAL" || this.user1.blind == null) {
                document.getElementById("1S").style.display = "none";
                document.getElementById("1B").style.display = "none";
            }

            if (this.user2.blind == "SMALL") {
                document.getElementById("2S").style.display = "inline";
                document.getElementById("2B").style.display = "none";
            }
            if (this.user2.blind == "BIG") {
                document.getElementById("2S").style.display = "none";
                document.getElementById("2B").style.display = "inline";
            }
            if (this.user2.blind == "NEUTRAL" || this.user1.blind == null) {
                document.getElementById("2S").style.display = "none";
                document.getElementById("2B").style.display = "none";
            }

            if (this.user3.blind == "SMALL") {
                document.getElementById("3S").style.display = "inline";
                document.getElementById("3B").style.display = "none";
            }
            if (this.user3.blind == "BIG") {
                document.getElementById("3S").style.display = "none";
                document.getElementById("3B").style.display = "inline";
            }
            if (this.user3.blind == "NEUTRAL" || this.user1.blind == null) {
                document.getElementById("3S").style.display = "none";
                document.getElementById("3B").style.display = "none";
            }

            if (this.user4.blind == "SMALL") {
                document.getElementById("4S").style.display = "inline";
                document.getElementById("4B").style.display = "none";
            }
            if (this.user4.blind == "BIG") {
                document.getElementById("4S").style.display = "none";
                document.getElementById("4B").style.display = "inline";
            }
            if (this.user4.blind == "NEUTRAL" || this.user1.blind == null) {
                document.getElementById("4S").style.display = "none";
                document.getElementById("4B").style.display = "none";
            }

            if (this.myselfUser.blind == "SMALL") {
                document.getElementById("OwnS").style.display = "inline";
                document.getElementById("OwnB").style.display = "none";
            }
            if (this.myselfUser.blind == "BIG") {
                document.getElementById("OwnS").style.display = "none";
                document.getElementById("OwnB").style.display = "inline";
            }
            if (this.myselfUser.blind == "NEUTRAL" || this.user1.blind == null) {
                document.getElementById("OwnS").style.display = "none";
                document.getElementById("OwnB").style.display = "none";
            }
        }

        //If display blinds in Showdown
        if (document.getElementById("playerOwnInfoOnTurnShowdown") != null) {
            if (this.user1.blind == "SMALL") {
                document.getElementById("1SS").style.display = "inline";
                document.getElementById("1BS").style.display = "none";
            }
            if (this.user1.blind == "BIG") {
                document.getElementById("1SS").style.display = "none";
                document.getElementById("1BS").style.display = "inline";
            }
            if (this.user1.blind == "NEUTRAL" || this.user1.blind == null) {
                document.getElementById("1SS").style.display = "none";
                document.getElementById("1BS").style.display = "none";
            }

            if (this.user2.blind == "SMALL") {
                document.getElementById("2SS").style.display = "inline";
                document.getElementById("2BS").style.display = "none";
            }
            if (this.user2.blind == "BIG") {
                document.getElementById("2SS").style.display = "none";
                document.getElementById("2BS").style.display = "inline";
            }
            if (this.user2.blind == "NEUTRAL" || this.user1.blind == null) {
                document.getElementById("2SS").style.display = "none";
                document.getElementById("2BS").style.display = "none";
            }

            if (this.user3.blind == "SMALL") {
                document.getElementById("3SS").style.display = "inline";
                document.getElementById("3BS").style.display = "none";
            }
            if (this.user3.blind == "BIG") {
                document.getElementById("3SS").style.display = "none";
                document.getElementById("3BS").style.display = "inline";
            }
            if (this.user3.blind == "NEUTRAL" || this.user1.blind == null) {
                document.getElementById("3SS").style.display = "none";
                document.getElementById("3BS").style.display = "none";
            }

            if (this.user4.blind == "SMALL") {
                document.getElementById("4SS").style.display = "inline";
                document.getElementById("4BS").style.display = "none";
            }
            if (this.user4.blind == "BIG") {
                document.getElementById("4SS").style.display = "none";
                document.getElementById("4BS").style.display = "inline";
            }
            if (this.user4.blind == "NEUTRAL" || this.user1.blind == null) {
                document.getElementById("4SS").style.display = "none";
                document.getElementById("4BS").style.display = "none";
            }

            if (this.myselfUser.blind == "SMALL") {
                document.getElementById("OwnSS").style.display = "inline";
                document.getElementById("OwnBS").style.display = "none";
            }
            if (this.myselfUser.blind == "BIG") {
                document.getElementById("OwnSS").style.display = "none";
                document.getElementById("OwnBS").style.display = "inline";
            }
            if (this.myselfUser.blind == "NEUTRAL" || this.user1.blind == null) {
                document.getElementById("OwnSS").style.display = "none";
                document.getElementById("OwnBS").style.display = "none";
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

    returnChatLog() {
        if (this.state.chatLog != null) {
            this.state.chatLog.map(ChatMessage => {
                return (
                    <ChatMessageField ChatMessage={ChatMessage}/>
                );
            })
        }
    }

    render() {
        if (this.gameEnd == true) {
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
                                this.logout()

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
                                this.logout()

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
        else if (this.game.gameName != null && this.game.showdown == false) {

            return (

                <GameContainer>
                    <TableCircleLeft></TableCircleLeft>
                    <TableCircleRight></TableCircleRight>
                    <Tablesquare></Tablesquare>
                    <UpperContainer>
                        <TopLeftPlayerContainer>
                            <PlayerInfoContainer
                                top="27.5%"
                                left="62.5%"
                                width="50%"
                                height="30%"
                                color="white"
                                background="grey"
                                padding="0 0 0 90px"
                                id="player2InfoOnTurn"
                                borderradius="10px"
                                border="solid white 1px">
                                {this.displayUser(this.user2)}
                            </PlayerInfoContainer>
                            <ProfileCircle
                                top="12.5%"
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
                                top="27.5%"
                                left="23.5%"
                                width="50%"
                                height="30%"
                                color="white"
                                background="grey"
                                padding="0 90px 0 10px"
                                id="player3InfoOnTurn"
                                borderradius="10px"
                                border="solid white 1px">
                                {this.displayUser(this.user3)}
                            </PlayerInfoContainer>
                            <ProfileCircle
                                top="12.5%"
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
                                left="75%"
                                width="115%"
                                height="19%"
                                color="white"
                                background="grey"
                                padding="0 0 0 90px"
                                id="player1InfoOnTurn"
                                borderradius="10px"
                                border="solid white 1px">
                                {this.displayUser(this.user1)}
                            </PlayerInfoContainer>
                            <ProfileCircle
                                top="2%"
                                left="0%"
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
                                            disabled={this.displayHowMuchCall(this.myselfUser) == 0}
                                >Call {this.displayHowMuchCall(this.myselfUser)}</CallButton>
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
                                width="115%"
                                height="19%"
                                color="white"
                                background="grey"
                                padding="0 90px 0 10px"
                                id="player4InfoOnTurn"
                                borderradius="10px"
                                border="solid white 1px">
                                {this.displayUser(this.user4)}
                            </PlayerInfoContainer>
                            <ProfileCircle
                                top="2%"
                                left="60%"
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
                                    {this.returnChatLog()}
                                </TextBacklogChatContainer>
                                <ChatInputField placeholder="Type in your message"></ChatInputField>
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
                                         id="checkButton"
                                         disabled={this.displayHowMuchCall(this.myselfUser) != 0}>Check</CheckButton>
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
                            height="80%"
                            color="white"
                            id="playerOwnUserInfoOnTurn">
                            {this.displayUser(this.myselfUser)}
                        </PlayerInfoContainer>
                        <ProfileCircle
                            top="-120%"
                            left="30%"
                            background='url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user5.jpg")'></ProfileCircle>
                    </BottomContainer>
                </GameContainer>);
        }

        //showdown
        else if (this.game.gameName != null && this.game.showdown == true) {

            this.showdown()

            return (

                <GameContainer>
                    <TableCircleLeft></TableCircleLeft>
                    <TableCircleRight></TableCircleRight>
                    <Tablesquare></Tablesquare>
                    <UpperContainer>
                        <TopLeftPlayerContainer>
                            <PlayerInfoContainer
                                top="27.5%"
                                left="62.5%"
                                width="50%"
                                height="30%"
                                color="white"
                                background="grey"
                                padding="0 0 0 90px"
                                id="player2InfoOnTurnShowdown"
                                borderradius="10px"
                                border="solid white 1px">
                                {this.displayUser(this.user2)}
                            </PlayerInfoContainer>
                            <ProfileCircle
                                top="12.5%"
                                left="30%"
                                background='url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user1.jpg")'></ProfileCircle>
                            <BigBlind
                                top="70%"
                                left="75%"
                                id="2BS"
                                transform="rotate(180deg)">B</BigBlind>
                            <SmallBlind
                                top="70%"
                                left="75%"
                                id="2SS"
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
                                    <FrontCardBox>{this.getUserCard(this.showdownUser2, 0)}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="30%"
                                    top="0"
                                    left="61%"
                                    height="100%"
                                    transform="rotate(180deg)">
                                    <FrontCardBox>{this.getUserCard(this.showdownUser2, 1)}</FrontCardBox>
                                </CardBox>
                            </PlayerCardsContainer>
                        </TopLeftPlayerContainer>
                        <TopRightPlayerContainer>
                            <BigBlind
                                top="70%"
                                left="35%"
                                id="3BS"
                                transform="rotate(180deg)">B</BigBlind>
                            <SmallBlind
                                top="70%"
                                left="35%"
                                id="3SS"
                                transform="rotate(180deg)">S</SmallBlind>
                            <PlayerInfoContainer
                                top="27.5%"
                                left="23.5%"
                                width="50%"
                                height="30%"
                                color="white"
                                background="grey"
                                padding="0 90px 0 10px"
                                id="player3InfoOnTurnShowdown"
                                borderradius="10px"
                                border="solid white 1px">
                                {this.displayUser(this.user3)}
                            </PlayerInfoContainer>
                            <ProfileCircle
                                top="12.5%"
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
                                    <FrontCardBox>{this.getUserCard(this.showdownUser3, 0)}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="30%"
                                    top="0"
                                    left="61%"
                                    height="100%"
                                    transform="rotate(180deg)">
                                    <FrontCardBox>{this.getUserCard(this.showdownUser3, 1)}</FrontCardBox>
                                </CardBox>
                            </PlayerCardsContainer>
                        </TopRightPlayerContainer>
                    </UpperContainer>
                    <MiddleContainer>
                        <PlayerLeftContainer>
                            <BigBlind
                                top="80%"
                                left="75%"
                                id="1BS"
                                transform="rotate(90deg)">B</BigBlind>
                            <SmallBlind
                                top="80%"
                                left="75%"
                                id="1SS"
                                transform="rotate(90deg)">S</SmallBlind>
                            <PlayerInfoContainer
                                top="11.5%"
                                left="75%"
                                width="115%"
                                height="19%"
                                color="white"
                                background="grey"
                                padding="0 0 0 90px"
                                id="player1InfoOnTurnShowdown"
                                borderradius="10px"
                                border="solid white 1px">
                                {this.displayUser(this.user1)}
                            </PlayerInfoContainer>
                            <ProfileCircle
                                top="2%"
                                left="0%"
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
                                    <FrontCardBox>{this.getUserCard(this.showdownUser1, 0)}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="60%"
                                    height="80%"
                                    top="35%"
                                    left="20%"
                                    transform="rotate(90deg)">
                                    <FrontCardBox>{this.getUserCard(this.showdownUser1, 1)}</FrontCardBox>
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
                                >
                                    <FrontCardBox>{this.getRiverCard(0)}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="58%"
                                >
                                    <FrontCardBox>{this.getRiverCard(1)}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="48%"
                                >
                                    <FrontCardBox>{this.getRiverCard(2)}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="38%"
                                >
                                    <FrontCardBox>{this.getRiverCard(3)}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="9%"
                                    height="80%"
                                    top="50%"
                                    left="28%"
                                >
                                    <FrontCardBox>{this.getRiverCard(4)}</FrontCardBox>
                                </CardBox>
                            </MiddleCardsContainer>
                            <CallContainer>
                                <CallButton onClick={() => {
                                    this.revealCards(true);
                                }} id="revealButton"
                                >Reveal Cards</CallButton>
                            </CallContainer>
                            <RaiseContainer>
                                <CallButton onClick={() => {
                                    this.revealCards(false);
                                }} id="notRevealButton"
                                >Don't Reveal Cards</CallButton>
                            </RaiseContainer>
                        </TableComponentsContainer>
                        <PlayerRightContainer>
                            <BigBlind
                                top="80%"
                                left="15%"
                                id="4BS"
                                transform="rotate(270deg)">B</BigBlind>
                            <SmallBlind
                                top="80%"
                                left="15%"
                                id="4SS"
                                transform="rotate(270deg)">S</SmallBlind>
                            <PlayerInfoContainer
                                top="11.5%"
                                left="25%"
                                width="115%"
                                height="19%"
                                color="white"
                                background="grey"
                                padding="0 90px 0 10px"
                                id="player4InfoOnTurnShowdown"
                                borderradius="10px"
                                border="solid white 1px">
                                {this.displayUser(this.user4)}
                            </PlayerInfoContainer>
                            <ProfileCircle
                                top="2%"
                                left="60%"
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
                                    <FrontCardBox>{this.getUserCard(this.showdownUser4, 0)}</FrontCardBox>
                                </CardBox>
                                <CardBox
                                    width="60%"
                                    height="80%"
                                    top="35%"
                                    left="20%"
                                    transform="rotate(270deg)">
                                    <FrontCardBox>{this.getUserCard(this.showdownUser4, 1)}</FrontCardBox>
                                </CardBox>
                            </PlayerCardsContainer>
                        </PlayerRightContainer>
                    </MiddleContainer>
                    <LowerContainer>
                        <ChatContainer>
                            <InnerTextChatContainer>
                                <TextBacklogChatContainer>
                                    {this.state.chatLog.map(ChatMessage => {
                                        return (
                                            <ChatMessageField ChatMessage={ChatMessage}/>
                                        );
                                    })}
                                </TextBacklogChatContainer>
                                <ChatInputField placeholder="Type in your message"></ChatInputField>
                            </InnerTextChatContainer>
                        </ChatContainer>
                        <BigBlind
                            top="-10%"
                            left="49%"
                            id="OwnBS">B</BigBlind>
                        <SmallBlind
                            top="-10%"
                            left="49%"
                            id="OwnSS">S</SmallBlind>
                        <OwnCardsContainer>
                            <CardBox
                                width="35%"
                                height="80%"
                                top="50%"
                                left="28%"
                            >
                                <FrontCardBox>{new Card(this.myselfUser.cards[0]).card}</FrontCardBox>
                            </CardBox>
                            <CardBox
                                width="35%"
                                height="80%"
                                top="50%"
                                left="72%"

                                visibility="hidden">
                                <FrontCardBox>{new Card(this.myselfUser.cards[1]).card}</FrontCardBox>
                            </CardBox>
                        </OwnCardsContainer>
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
                            height="80%"
                            color="white"
                            id="playerOwnInfoOnTurnShowdown"
                        >
                            {this.displayUser(this.myselfUser)}
                        </PlayerInfoContainer>
                        <ProfileCircle
                            top="-120%"
                            left="30%"
                            background='url("https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/user5.jpg")'></ProfileCircle>
                    </BottomContainer>
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
