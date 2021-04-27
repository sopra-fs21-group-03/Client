import {Clubs, Diamond, Heart, Spades} from "../../../views/design/Suits";
import styled from "styled-components";
import River from "./River";
import Pot from "./Pot";
import User from "./User";

class Game {

    constructor(data = {}) {
        this.gameName = null;
        this.players = null;
        this.river= null;
        this.pot=null;
        this.showdown=null;
        this.onTurn=null;
        this.round=null;
        Object.assign(this, data);
        this.river=new River(this.river)
        this.pot=new Pot(this.pot)
        this.onTurn=new User(this.onTurn)


    }

}
export default Game;