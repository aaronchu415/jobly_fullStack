import React, { Component } from 'react';
import './ChatRoom.css'

class ChatRoom extends Component {
  state = {}
  render() {
    return (
      <div className='ChatRoom'>
        <ul id="messages"></ul>
        <form id="msg-form">
          <input id="m" autocomplete="off" />
          <button>Send</button>
        </form>

      </div>
    );
  }
}

export default ChatRoom;
