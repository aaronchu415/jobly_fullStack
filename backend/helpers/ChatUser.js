/** Functionality related to chatting. */

// Room is an abstraction of a chat channel
const Room = require('./Room');

/** ChatUser is a individual connection from client -> server to chat. */

class ChatUser {
  /** make chat: store connection-device, rooom */

  constructor(send, roomName) {
    this._send = send; // "send" function for this user
    this.room = Room.get(roomName); // room user will be in
    this.name = null; // becomes the username of the visitor

    console.log(`created chat in ${this.room.name}`);
  }

  /** send msgs to this client using underlying connection-send-function */

  send(data) {
    try {
      this._send(data);
    } catch {
      // If trying to send to a user fails, ignore it
    }
  }

  /** handle joining: add to room members, announce join */

  handleJoin(name) {
    this.name = name;
    this.room.join(this);
    this.room.broadcast({
      type: 'note',
      text: `${this.name} joined "${this.room.name}".`
    });
  }

  /** handle a chat: broadcast to room. */

  handleChat(text) {
    this.room.broadcast({
      name: this.name,
      type: 'chat',
      text: text
    });
  }

  handleJoke() {
    let data = { type: "get-joke", name: "Server", text: "What do you call eight hobbits? A hob-byte!" };
    this.send(JSON.stringify(data));
  }

  handleMembers() {
    let members = Array.from(this.room.members).map(user => user.name).join(", ");
    let data = { type: "members", name: "Server", text: `In room: ${members}` };
    this.send(JSON.stringify(data));
  }

  handleNameChange(text) {
    let oldName = this.name;
    let newName = text.substring(5);
    this.name = newName;

    this.room.broadcast({
      name: "Server",
      type: 'name',
      text: `${oldName} changed to ${newName}`
    });
  }

  handlePrivateMessage(text) {
    let arr = text.split(" ");
    let toUser = arr[1];
    let message = arr.slice(2).join(" ");
    let data = { type: "priv", name: this.name, text: message };
    let member = Array.from(this.room.members).filter(user => user.name === toUser)[0];

    if (member) {
      member.send(JSON.stringify(data));
    }
  }


  /** Handle messages from client:
   *
   * - {type: "join", name: username} : join
   * - {type: "chat", text: msg }     : chat
   */

  handleMessage(jsonData) {
    let msg = JSON.parse(jsonData);

    if (msg.type === 'join') this.handleJoin(msg.name);
    else if (msg.type === 'chat') this.handleChat(msg.text);
    else if (msg.type === "get-joke") this.handleJoke(msg.text);
    else if (msg.type === "members") this.handleMembers(msg.text);
    else if (msg.type === "name") this.handleNameChange(msg.text);
    else if (msg.type === "priv") this.handlePrivateMessage(msg.text);
    else throw new Error(`bad message: ${msg.type}`);
  }

  /** Connection was closed: leave room, announce exit to others */

  handleClose() {
    this.room.leave(this);
    this.room.broadcast({
      type: 'note',
      text: `${this.name} left ${this.room.name}.`
    });
  }
}

module.exports = ChatUser;
