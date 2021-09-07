import logo from './logo.svg';
import './App.css';


import Websocket from 'react-websocket';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import React from 'react';

const instance = axios.create({
  baseURL: 'http://localhost:26657',
  timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});




class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      block: null
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload!!
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            
            <Websocket 
              url="ws://localhost:26657/websocket"
              onMessage={(data) => {
                console.log(data);
              }}
              onOpen={(data) => {
                console.log(data);
              }}
            />
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
