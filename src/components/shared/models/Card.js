class Card {
    constructor(data = {}) {
        this.suit = null;
        this.cardNumber = null;
        Object.assign(this, data);
    }
}
export default Card;
