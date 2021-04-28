/**
 * ChatMessage model
 */

class ChatMessage {
  constructor(data = {}) {
    this.messageType = null;
    this.name = null;
    this.messsage = null;
    Object.assign(this, data);
  }
}
export default ChatMessage;

