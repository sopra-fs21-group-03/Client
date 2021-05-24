class LobbyInfo{

    constructor(data = {}) {
        this.gameCanStart=null;
        this.name=null;
        this.players=null;
        this.inGame = null;
        Object.assign(this, data);
    }
}
export default LobbyInfo;
