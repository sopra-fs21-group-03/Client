/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.cards = null;
    this.id = null;
    this.name = null;
    this.username = null;
    this.token = null;
    this.status = null;
    Object.assign(this, data);
  }
}
export default User;

