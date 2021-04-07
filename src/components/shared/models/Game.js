import {Clubs, Diamond, Heart, Spades} from "../../../views/design/Suits";
import styled from "styled-components";

class Game {
    constructor(data = {}) {
        this.name = null;
        this.opponents = null;
        this.river= null;
        this.pot=null;
        this.showdown=null;
        this.onTurn=null;
        Object.assign(this, data);}

}
export default Game;