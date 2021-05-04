import Card from "./Card";


class River {
    constructor(data = {}) {
        this.cards=null
        Object.assign(this, data);
    }
    getCard(index){
        return new Card(this.cards[index]).card
    }
}
export default River;