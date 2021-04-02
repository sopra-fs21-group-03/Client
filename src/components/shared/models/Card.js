import {Spades} from "../../../views/design/Suits";
import styled from "styled-components";

const SymbolBox = styled.div`
      height: 42px;
      width: 28px;
      overflow: hidden;
      margin: auto;
      margin-bottom: auto;
      margin-top: -60px;
      text-align: center;
  `;

const CardBox = styled.li`
  background-color: white;  
  height: 60px;
  width: 45px;
  margin-left: 10px;
  margin-top: 0px
`;
const CardNumberOnCard= styled.div`
    height: 20px;
    width: 30px;
    margin-left: 8px;
    margin-top: 17px;
    flex-grow: 10;
    `;





class Card {
    constructor(data = {}) {
        this.suit = null;
        this.cardNumber = null;
        this.symbol= null;
        Object.assign(this, data)
        if(this.suit=="SPADES"){
            this.symbol=<Spades></Spades>}

        this.cardNumberOnCard=<CardNumberOnCard>{this.cardNumber}</CardNumberOnCard>;
        this.card=<CardBox>{this.cardNumberOnCard}<SymbolBox>{this.symbol}</SymbolBox></CardBox>
    };
}
export default Card;
