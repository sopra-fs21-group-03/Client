import styled from "styled-components";

const hearts10 = styled.div`
background-color: green;
  margin: 0;
  position: absolute;
  left: 50%;
  top: 40%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 65%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
  border-top: solid;
  border-bottom: solid;
  border-color: brown;
  border-width: 15px;
`;

class Deck implements Element {
        hearts = <hearts10>hello</hearts10>;

    findCard(suit, rank){
        if (suit=="heart"){

        }
    }
}


export default Deck;
