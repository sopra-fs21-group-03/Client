class Card {
    constructor(data = {}) {
        this.suit = null;
        this.cardNumber = null;
        this.symbol= null;
        Object.assign(this, data)
        if(this.suit=="heart"){
            this.symbol=<p>"heartt"</p>}
    };
}
export default Card;