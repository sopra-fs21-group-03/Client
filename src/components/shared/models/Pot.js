class Pot {
    constructor(data = {}) {
        this.contribution=null
        this.total=null;
        Object.assign(this, data);
    }
}
export default Pot;