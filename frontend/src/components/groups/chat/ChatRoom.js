import React, { Component } from 'react';
import './ChatRoom.css'

const URL = 'ws://localhost:3001/chat/chat/general'

class ChatRoom extends Component {
  state = {
    name: this.props.user,
    messages: [],
    text: ''
  }

  ws = new WebSocket(URL)

  addMessage = message => {
    this.setState(state => ({ messages: [...state.messages, message] }))
  }

  componentDidMount() {
    this.ws.onopen = (evt) => {

      console.log("open", evt);

      let data = { type: "join", name: this.state.name };
      this.ws.send(JSON.stringify(data));
    }

    this.ws.onmessage = evt => {

      console.log("message", evt);

      let msg = JSON.parse(evt.data);
      this.addMessage(msg)

    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }

    this.ws.onerror = function (evt) {
      console.error(`err ${evt}`);
    };
  }

  handleSubmit = (evt) => {
    evt.preventDefault()

    let text = this.state.text
    let type = "chat";

    if (text === "/joke") {
      type = "get-joke";
    } else if (text === "/members") {
      type = "members";
    } else if (text.includes("/name")) {
      type = "name";
    } else if (text.includes("/priv")) {
      type = "priv";
    }
    let data = { type, text };
    this.ws.send(JSON.stringify(data));

    this.setState({ text: '' })

  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  render() {

    const { messages } = this.state
    // messages.reverse()

    return (

      <div className="view pt-5">
        <div className="col-md-8 offset-md-2">
          <div className='ChatRoom'>
            <ul id="messages">
              {messages.map(msg => <li><b>{msg.name}: </b>{msg.text}</li>)}
            </ul>
            <form id="msg-form" onSubmit={this.handleSubmit}>
              <input onChange={this.handleChange} id="m" name='text' autocomplete="off" value={this.state.text} />
              <button type='submit'>Send</button>
            </form>
          </div>
        </div>
      </div>

    );
  }
}

export default ChatRoom;
