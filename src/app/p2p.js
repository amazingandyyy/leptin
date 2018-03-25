// import websocket
import Websocket from 'ws';

// define p2p web socket port
const P2P_PORT = process.env.P2P_PORT || 5001;
// define peer
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];
// Example of user configuration:
// $ HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev
// $ HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev

// create P2pServer class
class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  listen() {
    const server = new Websocket.Server({ port: P2P_PORT });
    server.on('connection', socket => this.connectNewSocket(socket));

    this.connectToPeers();
    console.log(`\x1b[96m[socket]\t listening on ${P2P_PORT}\x1b[0m`);
  }

  connectToPeers() {
    peers.forEach(peer => {
      // ws://localhost:5001
      // ws://localhost:5002
      // ...
      const socket = new Websocket(peer);

      socket.on('open', () => this.connectNewSocket(socket));
      socket.on('error', () => {
        console.log('\x1b[96m[socket]\t node is offline\x1b[0m');
      });
      socket.on('connection', () => {
        console.log('\x1b[96m[socket]\t node connected\x1b[0m');
      });
    });
  }

  connectNewSocket(socket) {
    this.sockets.push(socket);
    // console.log('Socket connected');
    // call message handler
    this.messageHandler(socket);
    // call send chain
    this.sendChain(socket);
  }

  messageHandler(socket) {
    socket.on('message', message => {
      const data = JSON.parse(message);
      this.blockchain.replaceChain(data);
    });
  }

  sendChain(socket) {
    // call message handler
    socket.send(JSON.stringify(this.blockchain.chain));
  }

  syncChains() {
    this.sockets.forEach(socket => {
      this.sendChain(socket);
    });
  }
}

export default P2pServer;