/**
 * User model
 */
import Card from "./Card";

class User {
  constructor(data = {}) {
    this.cards = null;
    this.id = null;
    this.name = null;
    this.username = null;
    this.token = null;
    this.role=null;
    this.money=null;
    if(this.cards==null){
      this.cards=[new Card({"suit":"NULL"}),new Card({"suit":"NULL"})]
    }
    Object.assign(this, data);
  }
}
export default User;

