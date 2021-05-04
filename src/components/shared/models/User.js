/**
 * User model
 */
import Card from "./Card";
import {DisplayUserInfo} from "../../../views/design/GameScreenStyle";

class User {

  constructor(data = {}) {
    this.blind = null;
    this.cards = null;
    this.money = null;
    this.username = null;

    Object.assign(this, data);
  }
  getCard(index){
    return new Card(this.cards[index]).card
  }
  displayUser(game) {
    return <DisplayUserInfo>{this.username} <br></br> Money : {this.money} Betting
      : {game.pot.contribution[this.username]}
    </DisplayUserInfo>;}
}


export default User;

