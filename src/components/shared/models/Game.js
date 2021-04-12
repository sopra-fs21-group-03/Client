import {Clubs, Diamond, Heart, Spades} from "../../../views/design/Suits";
import styled from "styled-components";
import River from "./River";

class Game {
    constructor(data = {}) {
        this.name = null;
        this.opponents = null;
        this.river= null;
        this.pot=null;
        this.showdown=null;
        this.onTurn=null;
        this.round=null;
        Object.assign(this, data);
        this.river=new River(this.river)}

}
export default Game;