import logo from './logo.svg';
import './App.css';


// import Websocket from 'react-websocket';
// import Button from 'react-bootstrap/Button';
import axios from 'axios';
import React from 'react';

import useWebSocket from 'react-use-websocket';


const ENDPOINT = 'jaredraycoleman-anrgusc-tendermint-demo-9qq4r64jhxwq6-26657.githubpreview.dev';
const instance = axios.create({
  baseURL: `https://${ENDPOINT}`,
  timeout: 1000,
  withCredentials: true,
  // headers: {'X-Custom-Header': 'foobar'}
});

const WS_ENDPOINT = `wss://${ENDPOINT}/websocket`;


const TendermintWebsocket = () => {
  const state = {};
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket
  } = useWebSocket(WS_ENDPOINT, {
    onOpen: () => {
      sendJsonMessage(
        {
            "jsonrpc": "2.0",
            "method": "subscribe",
            "id": 0,
            "params": {
                "query": "tm.event='NewBlock'"
            }
        }
      );
    },
    onMessage: (res) => {
      let data = JSON.parse(res.data);

      try {
        console.log(data.result.data.value.block.header.height);
      } catch (error) {
        
      }
    },
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  });


  return (
    <div>

    </div>
  );
}




class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      block: null
    }
  }

  render() {
    instance.get("/block?height=4").then(res => {
      console.log(res.data);
    });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TendermintWebsocket /> 
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
