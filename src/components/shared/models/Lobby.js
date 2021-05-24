class Lobby{

    constructor(data = {}) {
        this.name=null;
        this.playerCount=null;
        this.inGame=null;
        this.id=null;
        Object.assign(this, data);
    }
}
export default Lobby;
