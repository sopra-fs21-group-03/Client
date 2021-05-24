import React from "react";
import { api, handleError } from "../../helpers/api";
import { Loader, LoadingGameContainer } from "../../views/design/GameScreenStyle";
import { withRouter } from "react-router-dom";
import { BaseContainer } from "../../helpers/layout";
import styled from "styled-components";
import { BlackButton } from "../../views/design/BlackButton";



const InstructionsContainer = styled.div`
  font-size: 25px;
  position: absolute;
  left: 85%;
  transform: translate(-50%, -50%);
  color: rgb(135,206,250);
  background-color: rgb(0, 0, 0, 0.8);  
  max-width: 100%;
  height: 600px;
  width: 1000px;
  top: 55%;

`;

const BlackButton2 = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  display: flex;
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  color: red;
  width: 85%;
  height: 50px;
  border-radius: 10px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: black;
  transition: all 0.3s ease;
  border: solid;
  border-color: red;
  margin-top: 15px;
  margin-left: 7%;
`;


const LeaveButton = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  display: flex;
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  color: red;
  width: 10%;
  height: 50px;
  border-radius: 10px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: black;
  transition: all 0.3s ease;
  border: solid;
  border-color: red;
  margin-top: 50%;
  margin-left: 110%;
`;



const ButtonContainer = styled.div`
  position: absolute;
  left: 0%;
  transform: translate(-50%, -50%);
  background-color: rgb(0, 0, 0, 0.8); 
  color: red;
  max-width: 70%;
  height: 600px;
  width: 15%;
  top: 55%;
`;

const Combinations = styled.div`
      background: url('https://www.pokerharder.com/img/p/3/pokerhands_big.jpg');
      background-size: cover;
      margin-left: 10%;
      margin-top: 2.5%;
      border-radius: 30px;
      height: 90%;
      width: 80%;
  
      
`;

class PokerInstructionsScreen extends React.Component {

    combinations = <Combinations></Combinations>

    call = "If you call, that means you go along with the current bet. You are staying in the round."

    raise = "If you raise, that means you increase the current bet. The other then have to deciede wether they want to go along with your bet or not. " +
        "If you raise all the money you have left, you have gone all in, and the amount you can win from any other player, is limited to that number."

    fold = "If you fold, that means you don't want to take the risk of going along with the bet, you however lose the money you alreay put in the pot and lose all chances of winning money this round."

    check = " If you check, that means no one else has raised, and you don't want to raise either."

    round = "Each Round the players bet money, depending on how good they think their cards are. A player can either raise,fold,call or check. " +
        "After all player have decided what to do, and it is clear who wants to continue and who doesnt, cards get revealed, and the next round starts." +
        " This process goes on, first revealing 3 cards, then 1 and then 1 again. After the last round get finished, the showdown starts."

    showdown = "During the showdown, all players still betting get asked, if they want to reveal their cards or not. If not, the player is out of the gameround " +
        "at the end, all the cards revealed get looked at, and the player with the best combination of his own cards, and the cards in river, wins all the money in the pot."

    gameIdea = "Each player has 2 cards in his hand, and there are cards in the middle that belong to everyone (river), but are hidden at the start." +
        " Each round the players bet money and new cards get revealed from the cards in the middle. At the end of the gameround " +
        "the middle contains 5 cards and the player with the best combination of his own cards, and the cards in the middle" +
        " wins."
    
    spotify = "By clicking on the spotify icon you can log in to your spotify account and listen to music whilst playing. To make use of this feature, a premium subscription for spotify is needed."
    currentInfo = null;

    async componentDidMount() {
        this.interval = setInterval(async () => {
            this.setState({ time: Date.now() })
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <BaseContainer>
                <LeaveButton onClick={() => {
                    this.props.history.push(`/lobbyScreen`);
                }}>
                    Back to Lobby
                </LeaveButton>
                <InstructionsContainer>

                    {this.currentInfo}
                </InstructionsContainer>
                <ButtonContainer> Click on the Info you want!
                    <BlackButton2 onClick={() => {
                        this.currentInfo = this.gameIdea
                    }}
                    > General Game Idea </BlackButton2>
                    <BlackButton2 onClick={() => {
                        this.currentInfo = this.round
                    }}
                    > Round </BlackButton2>

                    <BlackButton2 onClick={() => {
                        this.currentInfo = this.call
                    }}
                    > Call </BlackButton2>
                    <BlackButton2 onClick={() => {
                        this.currentInfo = this.fold
                    }}
                    > Fold </BlackButton2>
                    <BlackButton2 onClick={() => {
                        this.currentInfo = this.check
                    }}
                    > Check </BlackButton2>
                    <BlackButton2 onClick={() => {
                        this.currentInfo = this.raise
                    }}
                    >  Raise </BlackButton2>
                    <BlackButton2 onClick={() => {
                        this.currentInfo = this.showdown
                    }}
                    > Showdown </BlackButton2>
                    <BlackButton2 onClick={() => {
                        this.currentInfo = this.combinations
                    }}
                    > Combinations </BlackButton2>
                    <BlackButton2 onClick={() => {
                        this.currentInfo = this.spotify
                    }}
                    > Spotify </BlackButton2>


                </ButtonContainer>
            </BaseContainer>
        )
    }





}
export default withRouter(PokerInstructionsScreen);