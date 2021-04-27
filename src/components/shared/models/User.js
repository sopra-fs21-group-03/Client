/**
 * User model
 */
import Card from "./Card";

class User {
  moneyInPot = null;

  constructor(data = {}) {
    this.cards = null;
    this.id = null;
    this.username = null;
    this.token = null;
    this.blind = null;
    this.money = null;
    this.display=null;
    if (this.cards == null) {
      this.cards = [new Card({"suit": "NULL"}), new Card({"suit": "NULL"})]
    }
    Object.assign(this, data);
  }
  display = (x) =>{
    return x
  }

}

export default User;

