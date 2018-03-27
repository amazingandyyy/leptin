// import packages
import express from 'express';
import bodyParser from 'body-parser';

// import blockchain
import Blockchain from '../blockchain';
// import P2pServer
import P2pServer from './p2p';
// import Wallet
import Wallet from '../wallet';
// imort Transaction Pool
import TransactionPool from '../wallet/transaction-pool';
// imort miner
import Miner from './miner';

// define port
const HTTP_PORT = process.env.HTTP_PORT || 3001;
// create express app
const app = express();

// create a Blockchain instance
const bc = new Blockchain();
// create wallet instance
const wallet = new Wallet();
// create transaction pool instance
const tp = new TransactionPool();
// create a P2pServer instance
const p2pServer = new P2pServer(bc, tp);
// create miner instance
const miner = new Miner(bc, tp, wallet, p2pServer);

// use body-parser json middleware
app.use(bodyParser.json());

// Handle GET /
app.get('/', (req, res) => res.send('connected'));

// Handle GET /blocks
app.get('/blocks', (req, res) => {
  res.json(bc.chain);
});

// Handle POST /mine
app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`\n\x1b[32m[blockchain]\t new block mined ${block.hash.substring(58, 63)}`);
  // sync to all chain whenever it find/mine a block
  p2pServer.syncChains();

  // return the latest blockchain;
  res.redirect('/blocks');
});

// Handle POST /mineTransactions
app.post('/mineTransactions', (req, res) => {
  miner.mine();
  // return the latest blockchain;
  res.redirect('/blocks');
});

// Handle GET /trnasactions
app.get('/transactions', (req, res) => {
  res.json(tp.transactions);
});

// Handle GET /trnasactions
app.post('/transaction', (req, res) => {
  const { recipient, amount } = req.body;
  const transaction = wallet.createTransaction(recipient, amount, bc, tp);
  // broadcast transaction
  p2pServer.broadcastTransaction(transaction);
  // send back transactions
  res.redirect('/transactions');
});

// Handle GET /public-key
app.get('/public-key', (req, res) => {
  res.json({ publicKey: wallet.publicKey });
});

// Handle GET /wallet
app.get('/wallet', (req, res) => {
  res.json({ wallet });
});

// App starts listening
app.listen(HTTP_PORT, () => {
  console.log(`\x1b[32m[server]\t listening on ${HTTP_PORT}\x1b[0m`);
});
p2pServer.listen();