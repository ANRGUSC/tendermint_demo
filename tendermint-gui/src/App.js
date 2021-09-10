import logo from './logo.svg';
import './App.css';


// import Websocket from 'react-websocket';
// import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import axios from 'axios';
import React, { useState } from 'react';

import useWebSocket from 'react-use-websocket';

const ENDPOINT = process.env.REACT_APP_CODESPACE_NAME ? `${process.env.REACT_APP_CODESPACE_NAME}-26657.githubpreview.dev` : (
  process.env.REACT_APP_GITPOD_WORKSPACE_URL ? process.env.REACT_APP_GITPOD_WORKSPACE_URL.replace("https://", "26657-") : "localhost:26657"
);
const instance = axios.create({
  baseURL: `https://${ENDPOINT}`,
  // timeout: 1000,
  withCredentials: true,
  // headers: {'X-Custom-Header': 'foobar'}
});

const WS_ENDPOINT = `wss://${ENDPOINT}/websocket`;
console.log(process.env.REACT_APP_GITPOD_WORKSPACE_URL.replace("https://", "26657-"));


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
          data.result.data.value.block,
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
      <ListGroup horizontal>
        {blocks.map((block, i) => {
          return (
            <ListGroupItem action key={block.header.height} onClick={() => props.onClick ? props.onClick(block) : null}>
                <b>Block # {block.header.height}</b>
                <p>{block.header.consensus_hash.slice(0, 5)}...</p>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
}

const toTable = (obj) => {
  return (
    <Table responsive>
      <tbody>
        {Object.entries(obj).filter(([key, value]) => typeof value === 'string').map(([key, value]) => {
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}


const App = (props) => {
  const [block, setBlock] = useState({});

  // instance.get("/net_info", {withCredentials: true}).then(res => {
  //   console.log(res.data);
  // }).catch(err => {
  //   console.log(err);
  // });

  return (
    <Container>
      <Row>
        <Col>
          <h1>Blockchain Visualizer</h1>
          If the page doesn't load properly try clicking <a href={`https://${ENDPOINT}`}>here</a> and coming back
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <TendermintWebsocket length={5} onClick={setBlock} /> 
        </Col>
      </Row>
      <Row className="mt-4">
        {block.header === undefined ?  null : (
          <Col>
            <h3>Block {block.header.height}</h3>
            {toTable(block.header)}
            {
              block.last_commit.signatures.map((validator, i) => {
                return (
                  <div key={`validator-${i}`}>
                    <h5>Validator {i+1}</h5>
                    {toTable(validator)}
                  </div>
                );
              })
            }
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default App;
