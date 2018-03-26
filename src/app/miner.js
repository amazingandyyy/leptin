import Wallet from '../wallet';
import Transaction from '../wallet/transaction';

class Miner {
  constructor(_blockchain, _transactionPool, _wallet, _p2pServer) {
    this.blockchain = _blockchain;
    this.transactionPool = _transactionPool;
    this.wallet = _wallet;
    this.p2pServer = _p2pServer;
  }
  mine() {
    const validTransactions = this.transactionPool.validTransactions();
    // include a reward for the miner
    validTransactions.push(Transaction.rewardsMiner(this.wallet, Wallet.blockchainWallet()));
    // create a block consisting of the valid transactions
    const block = this.blockchain.addBlock(validTransactions);
    console.log(`\n\x1b[32m[blockchain]\t new block mined ${block.hash.substring(58, 63)}`);
    // synchronize the chains in the peer-to-peer server
    this.p2pServer.syncChains();
    // clear the transaction pool
    this.transactionPool.clear();
    // broadcast to every miner to clear their transactions
    this.p2pServer.broadcastClearTransactions();
    // return the latest block
    return block;
  }
}

export default Miner;