import {Diamond} from "../../../views/design/Suits";

class Card {
    constructor(data = {}) {
        this.suit = null;
        this.cardNumber = null;
        this.symbol= null;
        Object.assign(this, data)
        if(this.suit=="heart"){
            this.symbol=<Diamond>"heart"</Diamond>}
    };
}
export default Card;
