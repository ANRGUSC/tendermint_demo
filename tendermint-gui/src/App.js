import logo from './logo.svg';
import './App.css';


// import Websocket from 'react-websocket';
// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import axios from 'axios';
import React, { useState } from 'react';

import useWebSocket from 'react-use-websocket';

const ENDPOINT = `${process.env.REACT_APP_CODESPACE_NAME}-26657.githubpreview.dev`;
const instance = axios.create({
  baseURL: `https://${ENDPOINT}`,
  // timeout: 1000,
  withCredentials: true,
  // headers: {'X-Custom-Header': 'foobar'}
});

const WS_ENDPOINT = `wss://${ENDPOINT}/websocket`;


const TendermintWebsocket = (props) => {
  const [ blocks, setBlocks ] = useState([]);
  const [ height, setHeight ] = useState(0);
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
        setBlocks([
          (
            <div>
              <b>{data.result.data.value.block.header.height}</b>
              <p>{data.result.data.value.block.header.last_block_id.hash.slice(0, 5)}</p>
            </div>
          ), 
          ...blocks.slice(0, props.length-1 || 5)]
        );
        setHeight(data.result.data.value.block.header.height);
      } catch (error) {
        console.log(error);
      }
    },
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  });


  return (
    <div>
      <h3>Height: {height}</h3>
      <ListGroup horizontal>
        {blocks.map((block, i) => {
          return <ListGroupItem key={i}>{block}</ListGroupItem>;
        })}
      </ListGroup>
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
    instance.get("/net_info").then(res => {
      console.log(res.data);
    });

    return (
      <Container>
        <Row>
          <Col><h1>Blockchain Visualizer</h1></Col>
        </Row>
        <Row>
          <Col>
            <TendermintWebsocket length={10} /> 
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
