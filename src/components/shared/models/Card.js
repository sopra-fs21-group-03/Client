import {Clubs, Diamond, Heart, Spades} from "../../../views/design/Suits";
import styled from "styled-components";

const SymbolBox = styled.div`
      height: 42px;
      width: 28px;
      overflow: hidden;
      margin: auto;
      margin-bottom: auto;
      margin-top: -62px;
      text-align: center;
  `;

const SymbolBox2 = styled.div`
      height: 39px;
      width: 32px;
      overflow: hidden;
      text-align: center;
      margin: auto;
      margin-top: 15px;
     
`;

const CardBox = styled.div`
  background-color: white;  
  height: 100%;
  width: 100%;
  border: 2px solid black;
`;

const CardNumberOnCard= styled.div`
    height: 20px;
    width: 100%;
    margin-top: 16px;
    flex-grow: 10;
    position: absolute;
    top: 50%;
    text-align: center;
`;





class Card {
    constructor(data = {}) {
        this.suit = null;
        this.cardNumber = null;
        this.symbol= null;
        Object.assign(this, data)
        if(this.suit=="SPADES"){
            this.symbol=<SymbolBox2><Spades></Spades></SymbolBox2>}
        if(this.suit=="DIAMOND"){
            this.symbol=<SymbolBox2><Diamond></Diamond></SymbolBox2>}
        if(this.suit=="HEART"){
            this.symbol=<SymbolBox2><Heart></Heart></SymbolBox2>}
        if(this.suit=="CLUBS"){
            this.symbol=<SymbolBox2><Clubs></Clubs></SymbolBox2>}

        this.cardNumberOnCard=<CardNumberOnCard>{this.cardNumber}</CardNumberOnCard>;
        this.card=<CardBox>{this.cardNumberOnCard}{this.symbol}</CardBox>
    };
}
export default Card;
